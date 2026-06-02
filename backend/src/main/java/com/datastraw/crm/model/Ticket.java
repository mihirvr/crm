package com.datastraw.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tickets")
@Data
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_id", unique = true, nullable = false)
    private String ticketId;

    @NotBlank(message = "Customer name is required")
    @Column(name = "customer_name", nullable = false, columnDefinition = "TEXT")
    private String customerName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "customer_email", nullable = false, columnDefinition = "TEXT")
    private String customerEmail;

    @NotBlank(message = "Subject is required")
    @Column(columnDefinition = "TEXT")
    private String subject;

    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String priority = "Medium"; 

    @Column(nullable = false)
    private String status = "Open"; 

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes = new ArrayList<>();
}