package ru.corndev.api.exceptions;

public class AppExceptionResponse {

    private String message;

    public AppExceptionResponse(String message){
        this.message = message;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
