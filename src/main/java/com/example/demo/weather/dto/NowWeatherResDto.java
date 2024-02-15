package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NowWeatherResDto {
    private String baseDate;
    private String baseTime;
    private String PTY;
    private String REH;
    private String RN1;
    private String T1H;
    private String UUU;
    private String VEC;
    private String VVV;
    private String WSD;
    private int nx;
    private int ny;
    private String r1;
    private String r2;
    private String r3;
}