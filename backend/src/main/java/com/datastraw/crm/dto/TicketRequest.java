package com.datastraw.crm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record TicketRequest(
        @NotBlank(message = "Customer name is required") String customerName,
        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String customerEmail,
        @NotBlank(message = "Subject is required") String subject,
        @NotBlank(message = "Description is required") String description,
        String priority
) {}