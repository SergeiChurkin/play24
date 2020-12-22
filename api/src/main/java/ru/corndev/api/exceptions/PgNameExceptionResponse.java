package ru.corndev.api.exceptions;

public class PgNameExceptionResponse {

    private String pgName;

    public PgNameExceptionResponse(String pgName){
        this.pgName = pgName;
    }

    public String getPgName() {

        return pgName;
    }

    public void setPgName(String pgName) {
        this.pgName = pgName;
    }
}
