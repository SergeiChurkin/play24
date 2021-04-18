package ru.corndev.api.payload;

import javax.validation.constraints.NotBlank;

public class FriendRequestPayload {
    @NotBlank(message = "Введите email для запроса в друзья")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
