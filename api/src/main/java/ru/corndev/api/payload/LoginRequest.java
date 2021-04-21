package ru.corndev.api.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest   {
    @NotBlank(message = "Заполните имя пользователя")
    private String usernameLogin;
    @NotBlank(message = "Пароль не может быть пустым")
    private String passwordLogin;

    public String getUsernameLogin() {
        return usernameLogin;
    }

    public void setUsernameLogin(String usernameLogin) {
        this.usernameLogin = usernameLogin;
    }

    public String getPasswordLogin() {
        return passwordLogin;
    }

    public void setPasswordLogin(String passwordLogin) {
        this.passwordLogin = passwordLogin;
    }
}
