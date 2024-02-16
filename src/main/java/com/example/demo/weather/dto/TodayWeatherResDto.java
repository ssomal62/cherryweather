package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodayWeatherResDto {

    private String fcstDate;
    private String fcstTime;
    private String POP;
    private String PTY;
    private String PCP;
    private String REH;
    private String SNO;
    private String SKY;
    private String TMP;
    private String TMN;
    private String TMX;
    private String UUU;
    private String VVV;
    private String WAV;
    private String VEC;
    private String WSD;
    private int nx;
    private int ny;
    private String r1;
    private String r2;
    private String r3;
}