package com.example.demo;

public enum Roles {
    USER, ADMIN, DEVELOPER;

    @Override
    public String toString() {
        return "ROLE_" + name();
    }
}
