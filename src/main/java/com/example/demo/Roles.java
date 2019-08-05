package com.example.demo;

public enum Roles {
    USER, ADMIN;

    @Override
    public String toString() {
        return "ROLE_" + name();
    }
}
