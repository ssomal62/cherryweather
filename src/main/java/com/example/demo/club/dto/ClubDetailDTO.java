package com.example.demo.club.dto;


import com.example.demo.club.entity.Club;
import lombok.Builder;

@Builder
public record ClubDetailDTO(
        Club clubDetail,
        String hostName,
        String hostProfile,
        Boolean liked
) {

}
