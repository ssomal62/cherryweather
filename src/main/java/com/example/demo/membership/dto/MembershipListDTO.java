package com.example.demo.membership.dto;

import com.example.demo.membership.domain.MembershipSummary;
import lombok.Builder;

import java.util.List;

@Builder
public record MembershipListDTO(
        List<MembershipSummary> summaryList
) {
}
