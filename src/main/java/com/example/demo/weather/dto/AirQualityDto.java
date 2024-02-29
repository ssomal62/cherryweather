package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AirQualityDto {
    private String pm25Value;
    private String pm25Grade;
    private String pm10Value;
    private String pm10Grade;
    private String coValue;
    private String coGrade;
    private String no2Value;
    private String no2Grade;
    private String o3Value;
    private String o3Grade;
    private String so2Value;
    private String so2Grade;
    private String khaiValue;
    private String khaiGrade;
    private String dataTime;
    private String stationName;
    private String stationCode;

}
