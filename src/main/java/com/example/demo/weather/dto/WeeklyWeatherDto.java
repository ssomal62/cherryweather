package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WeeklyWeatherDto {
    private String fcstDate;
    private String fcstTime;
    private String POP;
    private String weather;
    private String TMN;
    private String TMX;
}
