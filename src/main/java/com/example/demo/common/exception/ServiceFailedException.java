package com.example.demo.common.exception;

import com.example.demo.common.exception.enums.ExceptionStatus;
import lombok.Getter;

@Getter
public class ServiceFailedException extends RuntimeException {

    private final int statusCode;
    private final String message;

    public ServiceFailedException(ExceptionStatus ex) {
        this.statusCode = ex.getStatusCode();
        this.message = ex.getMessage();
    }
}
