package com.example.demo.common.exception;

import com.example.demo.common.exception.enums.ExceptionStatus;
import lombok.Getter;
@Getter
public class DuplicatedException extends RuntimeException {

    private final int statusCode;
    private final String message;

    public DuplicatedException(ExceptionStatus status) {
        this.statusCode = status.getStatusCode();
        this.message = status.getMessage();
    }
}
