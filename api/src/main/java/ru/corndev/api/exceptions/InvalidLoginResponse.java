package ru.corndev.api.exceptions;

public class InvalidLoginResponse {
    private String usernameLogin;
    private String passwordLogin;

    public InvalidLoginResponse() {
        this.usernameLogin = "Invalid username";
        this.passwordLogin = "Invalid password";
    }

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
