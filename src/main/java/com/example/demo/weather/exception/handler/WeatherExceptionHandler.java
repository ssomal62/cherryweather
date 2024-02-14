package com.example.demo.weather.exception.handler;

import com.example.demo.weather.exception.LookupException;
import com.example.demo.weather.exception.response.ExceptionResponse;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Getter
@ControllerAdvice
public class WeatherExceptionHandler {

    @ExceptionHandler(LookupException.class)
    public ResponseEntity<ExceptionResponse> handleLookupException(LookupException e) {
        return ResponseEntity
                       .status(e.getStatusCode())
                       .body(new ExceptionResponse(e.getStatusCode(), e.getMessage()));
    }

}