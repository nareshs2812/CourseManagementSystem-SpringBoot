package com.example.springbootfirst.models;

import java.util.Set;

public class UserDetailsDto {
  private String name;
  private String userName;
  private String email;
  private String password;
  private Set<String> roleNames;

  public UserDetailsDto() {
  }

  public UserDetailsDto(String name, String userName, String email, String password, Set<String> roleNames) {
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roleNames = roleNames;
  }



  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<String> getRoleNames() {
    return roleNames;
  }

  public void setRoleNames(Set<String> roleNames) {
    this.roleNames = roleNames;
  }

  @Override
  public String toString() {
    return "UserDetailsDto{" +
            "name='" + name + '\'' +
            ", userName='" + userName + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", roleNames=" + roleNames +
            '}';
  }
}
