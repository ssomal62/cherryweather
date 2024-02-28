package com.example.demo.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SatelliteImageDto {
    private String satImg;
}
