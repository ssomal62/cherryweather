package com.example.demo.club.dto;


import com.example.demo.club.domain.ClubSummary;

import lombok.Builder;


import java.util.List;


@Builder
public record ClubListDTO(List<ClubSummary> summaryList) {

}
