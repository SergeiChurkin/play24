package ru.corndev.api.exceptions;

public class EmailFriendRequestResponse {
    private String email;

    public EmailFriendRequestResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
