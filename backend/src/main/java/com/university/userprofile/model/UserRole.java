package com.university.userprofile.model;

public enum UserRole {
    ADMINISTRATOR("Administrador"),
    TEACHER("Docente"),
    STUDENT("Estudante");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}