package ru.corndev.api.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest   {
    @NotBlank(message = "Заполните имя пользователя")
    private String username;
    @NotBlank(message = "Пароль не может быть пустым")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
