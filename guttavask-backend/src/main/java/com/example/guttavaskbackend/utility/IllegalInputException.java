package com.example.guttavaskbackend.utility;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class IllegalInputException extends RuntimeException {

    public IllegalInputException(String exception) {
        super(exception);
    }

}
