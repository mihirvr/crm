package com.datastraw.crm.service;

import com.datastraw.crm.dto.TicketRequest;
import com.datastraw.crm.dto.TicketStatsResponse;
import com.datastraw.crm.dto.TicketUpdateRequest;
import com.datastraw.crm.model.Note;
import com.datastraw.crm.model.Ticket;
import com.datastraw.crm.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    @Transactional
    public Ticket createTicket(TicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setCustomerName(request.customerName());
        ticket.setCustomerEmail(request.customerEmail());
        ticket.setSubject(request.subject());
        ticket.setDescription(request.description());
        
        if (request.priority() != null && !request.priority().isBlank()) {
            ticket.setPriority(request.priority());
        }

        // Generate ID like TKT-001 based on current count
        long count = ticketRepository.count();
        ticket.setTicketId(String.format("TKT-%03d", count + 1));

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTickets(String status, String search) {
        if (search != null && !search.isBlank()) {
            return ticketRepository.searchTickets(search);
        }
        if (status != null && !status.isBlank()) {
            return ticketRepository.findByStatus(status);
        }
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(String ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    @Transactional
    public Ticket updateTicket(String ticketId, TicketUpdateRequest request) {
        Ticket ticket = getTicketById(ticketId);

        if (request.status() != null && !request.status().isBlank()) {
            ticket.setStatus(request.status());
        }

        if (request.noteText() != null && !request.noteText().isBlank()) {
            Note note = new Note();
            note.setNoteText(request.noteText());
            note.setTicket(ticket);
            ticket.getNotes().add(note);
        }

        return ticketRepository.save(ticket);
    }

    public TicketStatsResponse getTicketStats() {
        long total = ticketRepository.count();
        long open = ticketRepository.countByStatus("Open");
        long inProgress = ticketRepository.countByStatus("In Progress");
        long closed = ticketRepository.countByStatus("Closed");

        return new TicketStatsResponse(total, open, inProgress, closed);
    }
}