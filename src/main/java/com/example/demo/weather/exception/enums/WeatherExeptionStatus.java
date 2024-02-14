package com.example.demo.weather.exception.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WeatherExeptionStatus {

    IP_LOOKUP_FAILED(500, "IP 조회 실패"),
    JSON_PARSING_FAILED(500, "IP 조회 중 JSON 파싱 실패"),
    WEATHER_INFO_LOOKUP_FAILED(500, "날씨 정보 조회 실패"),
    LOCATION_INFO_LOOKUP_FAILED(500, "위치 정보 조회 실패");

    private final int statusCode;
    private final String message;
}