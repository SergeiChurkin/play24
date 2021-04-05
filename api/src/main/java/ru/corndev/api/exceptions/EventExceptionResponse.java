package ru.corndev.api.exceptions;

public class EventExceptionResponse {

    private String message;

    public EventExceptionResponse(String message){
        this.message = message;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
