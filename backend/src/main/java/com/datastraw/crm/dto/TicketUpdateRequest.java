package com.datastraw.crm.dto;

public record TicketUpdateRequest(
        String status,
        String noteText
) {}