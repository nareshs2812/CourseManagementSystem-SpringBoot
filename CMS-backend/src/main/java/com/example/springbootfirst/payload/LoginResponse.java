package com.example.springbootfirst.payload;

import java.util.Set;
import com.example.springbootfirst.models.Roles;

public class LoginResponse {
    private Long userId;
    private String userName;
    private String token;
    private Set<Roles> roles;
    private String email;

    public LoginResponse(Long userId, String userName, String token, Set<Roles> roles, String email) {
        this.userId = userId;
        this.userName = userName;
        this.token = token;
        this.roles = roles;
        this.email = email;
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

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
