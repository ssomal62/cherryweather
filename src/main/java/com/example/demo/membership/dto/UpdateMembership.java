package com.example.demo.membership.dto;

import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.enums.RegisteredStatus;

public record UpdateMembership(
        Long membershipId,
        RegisteredStatus membershipStatus,
        ClubRole role,
        Long updatedUserId
) {
}
