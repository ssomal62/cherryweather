package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GeoLocationResDto {
    private String r1; // (예: 시/도)
    private String r2; // (예: 구/군)
    private String r3; // (예: 동/읍/면)
    private double nx; // 기상청 API x좌표
    private double ny; // 기상청 API y좌표
}