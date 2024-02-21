package com.example.demo.membership.dto;

import com.example.demo.membership.domain.MembershipSummary;
import com.example.demo.membership.entity.Membership;
import lombok.Builder;

import java.util.List;

@Builder
public record MembershipListDTO(
        List<MembershipSummary> summaryList
) {
    public static MembershipListDTO fromMembership(List<Membership> memberships) {
        return MembershipListDTO.builder()
                .summaryList(
                        memberships.stream()
                                .map(MembershipListDTO::convertToSummary)
                                .toList()
                )
                .build();
    }

    private static MembershipSummary convertToSummary(Membership membership) {
        return MembershipSummary.builder()
                .clubId(membership.getClub().getClubId())
                .userId(membership.getAccount().getAccountId())
                .userName(membership.getAccount().getProfileName())
                .userProfile(membership.getAccount().getProfileImage())
                .role(membership.getRole())
                .status(membership.getStatus())
                .build();
    }
}
