package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MonitoringStationDto {
    private String stationCode;
    private String tm;
    private String addr;
    private String stationName;
}
