require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

/*
 * MIDDLEWARE ORDER MATTERS
 * 1. Logger: Runs first to catch every incoming request before it is processed.
 * 2. CORS: Runs next to append cross-origin headers. If blocked here, the request stops.
 * 3. express.json(): Parses the incoming request body into req.body so our proxy can forward it.
 * 4. Routes: Finally, the request hits the specific route handlers (/health or /api/*).
 */

// 1. Request Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 2. CORS Middleware
app.use(cors());

// 3. Body Parsing Middleware
app.use(express.json());

// 4. Routes

// Gateway Health Check (Handled directly by Express, not proxied)
app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        service: "express-gateway",
        timestamp: new Date()
    });
});

// Proxy Route for Spring Boot Backend
app.all('/api/*', async (req, res) => {
    try {
        // Construct the target URL (e.g., http://localhost:8080/api/tickets)
        const targetUrl = `${BACKEND_URL}${req.originalUrl}`;

        // Forward the request to the Spring Boot backend
        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
                'Authorization': req.headers['authorization'] // Preserved for future JWTs
            }
        });

        // Send the successful Spring Boot response back to the React client
        res.status(response.status).json(response.data);

    } catch (error) {
        // Handle errors returned *by* the Spring Boot backend (e.g., 400 Validation Error)
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } 
        // Handle connection errors (e.g., Spring Boot server is turned off/unreachable)
        else if (error.request) {
            console.error("[Proxy Error] Backend is unreachable.");
            res.status(503).json({ error: "Backend unavailable" });
        } 
        // Handle general execution errors within Express
        else {
            console.error("[Proxy Error] Gateway execution failed:", error.message);
            res.status(500).json({ error: "Internal Gateway Error" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Express API Gateway running on http://localhost:${PORT}`);
    console.log(`🔗 Proxying /api/* requests to ${BACKEND_URL}`);
});