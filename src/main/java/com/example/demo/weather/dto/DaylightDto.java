package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DaylightDto {
    private String locdate;
    private String sunrise;
    private String sunset;
    private String moonrise;
    private String moonset;
}
