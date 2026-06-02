package com.datastraw.crm.dto;

public record TicketStatsResponse(
        long total,
        long open,
        long inProgress,
        long closed
) {}