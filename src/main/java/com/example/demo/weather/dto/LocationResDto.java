package com.example.demo.weather.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LocationResDto {
    private Double nx;
    private Double ny;
    private String ip;
}
