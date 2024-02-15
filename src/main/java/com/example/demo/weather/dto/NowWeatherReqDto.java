package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NowWeatherReqDto {
    private String baseDate;
    private String baseTime;
    private String category;
    private int nx;
    private int ny;
    private String obsrValue;
}
