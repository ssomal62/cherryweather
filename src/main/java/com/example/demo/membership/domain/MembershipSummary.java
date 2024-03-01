package com.example.demo.membership.domain;

import com.example.demo.club.domain.ClubSummary;
import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.enums.RegisteredStatus;
import lombok.Builder;

@Builder
public record MembershipSummary(
        long clubId,
        long userId,
        String userName,
        String userProfile,
        ClubRole role,
        RegisteredStatus status,
        ClubSummary clubSummary
) {
}
