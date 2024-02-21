package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HourlyWeatherDto {
    private String fcstDate;
    private String fcstTime;
    private String weather;
    private String tmp;
    private String pty;
    private String sky;
}
