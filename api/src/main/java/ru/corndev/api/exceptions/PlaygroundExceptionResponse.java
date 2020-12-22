package ru.corndev.api.exceptions;

public class PlaygroundExceptionResponse {

    private String message;

    public PlaygroundExceptionResponse(String message){
        this.message = message;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
