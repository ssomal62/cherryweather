package com.example.demo.membership.dto;

public record MembershipQueryDTO(
        String email,
        Long clubId
) {
}