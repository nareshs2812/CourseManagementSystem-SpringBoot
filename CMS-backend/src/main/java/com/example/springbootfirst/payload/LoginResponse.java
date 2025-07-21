package com.example.springbootfirst.payload;

public class LoginResponse {
    private Long userId;
    private String userName;
    private String token;

    public LoginResponse(Long userId, String userName, String token) {
        this.userId = userId;
        this.userName = userName;
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getToken() {
        return token;
    }
}
