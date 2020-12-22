package ru.corndev.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PlaygroundException extends RuntimeException{

    public PlaygroundException(String message) {
        super(message);
    }
}
