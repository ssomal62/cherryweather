package com.example.demo.membership.domain;

import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.enums.RegisteredStatus;
import lombok.Builder;

@Builder
public record MembershipSummary(
        long clubId,
        long userId,
        String screenName,
        ClubRole role,
        RegisteredStatus status
) {
}