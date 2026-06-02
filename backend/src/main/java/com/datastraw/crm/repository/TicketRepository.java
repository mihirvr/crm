package com.datastraw.crm.repository;

import com.datastraw.crm.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    Optional<Ticket> findByTicketId(String ticketId);
    
    // For your search functionality (Name, Ticket ID, Email, Description)
    @Query("SELECT t FROM Ticket t WHERE " +
           "LOWER(t.customerName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.ticketId) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.customerEmail) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Ticket> searchTickets(@Param("search") String search);

    List<Ticket> findByStatus(String status);
    
    // For the bonus dashboard stats
    long countByStatus(String status);
}