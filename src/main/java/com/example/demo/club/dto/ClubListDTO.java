package com.example.demo.club.dto;


import com.example.demo.club.domain.ClubSummary;

import com.example.demo.club.entity.Club;
import lombok.Builder;


import java.util.List;


@Builder
public record ClubListDTO(List<ClubSummary> summaryList) {

    public static ClubListDTO fromClubs(List<Club> clubs) {
        return ClubListDTO.builder()
                .summaryList(
                        clubs.stream()
                                .map(club -> ClubSummary.builder()
                                        .clubId(club.getClubId())
                                        .name(club.getName())
                                        .currentMembers(club.getCurrentMembers())
                                        .maxMembers(club.getMaxMembers())
                                        .status(club.getStatus())
                                        .build())
                                .toList()
                )
                .build();
    }

}
