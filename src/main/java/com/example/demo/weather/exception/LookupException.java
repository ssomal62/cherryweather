package com.example.demo.weather.exception;

import com.example.demo.weather.exception.enums.WeatherExeptionStatus;
import lombok.Getter;

@Getter
public class LookupException extends RuntimeException {
    private final int statusCode;
    private final String message;

    public LookupException(WeatherExeptionStatus status) {
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
    }
}