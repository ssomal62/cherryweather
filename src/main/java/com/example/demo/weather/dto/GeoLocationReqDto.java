package com.example.demo.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GeoLocationReqDto {
    private String country;
    private String code;
    private String r1; // (예: 시/도)
    private String r2; // (예: 구/군)
    private String r3; // (예: 동/읍/면)
    private double lat; // 위도

    @JsonProperty("long")
    private double lon; // 경도
    private String net; // 네트워크 제공자
    private String ip;
}