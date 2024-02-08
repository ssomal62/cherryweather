package com.example.demo.membership.dto;

import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.enums.RegisteredStatus;
import jakarta.validation.constraints.Email;

public record UpdateMembership(
        long clubId,
        @Email(message = "[userEmail] 올바른 이메일 형식이 아닙니다.")
        String userEmail,

        String screenName,
        RegisteredStatus status,
        ClubRole role,
        Long updatedUserId
) {
}