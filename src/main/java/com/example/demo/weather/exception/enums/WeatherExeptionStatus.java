package com.example.demo.weather.exception.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WeatherExeptionStatus {
    IP_NOT_FOUND(404, "IP not found");

    private final int statusCode;
    private final String message;
}
