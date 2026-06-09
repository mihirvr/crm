@echo off
echo ==================================================
echo   Starting SupportTicketing CRM Full Stack
echo ==================================================

echo.
echo [1/3] Booting Spring Boot Backend (Port 8080)...
start cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo [2/3] Booting Express API Gateway (Port 3000)...
start cmd /k "cd frontend && npm run dev"

echo [3/3] Booting React Frontend (Port 5173)...
start cmd /k "cd server && npm run dev"

echo.
echo All services have been launched in separate windows!
echo Keep an eye on the Express Gateway terminal to see your custom request logs.
echo ==================================================
pause