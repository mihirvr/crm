package com.datastraw.crm.controller;

import com.datastraw.crm.dto.TicketRequest;
import com.datastraw.crm.dto.TicketStatsResponse;
import com.datastraw.crm.dto.TicketUpdateRequest;
import com.datastraw.crm.model.Ticket;
import com.datastraw.crm.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "${ALLOWED_ORIGIN}") // Pulls directly from your .env
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTicket(@Valid @RequestBody TicketRequest request) {
        Ticket ticket = ticketService.createTicket(request);
        Map<String, Object> response = new HashMap<>();
        response.put("ticket_id", ticket.getTicketId());
        response.put("created_at", ticket.getCreatedAt());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ticketService.getTickets(status, search));
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String ticketId) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<Map<String, Object>> updateTicket(
            @PathVariable String ticketId,
            @RequestBody TicketUpdateRequest request) {
        Ticket updatedTicket = ticketService.updateTicket(ticketId, request);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("updated_at", updatedTicket.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<TicketStatsResponse> getTicketStats() {
        return ResponseEntity.ok(ticketService.getTicketStats());
    }
}