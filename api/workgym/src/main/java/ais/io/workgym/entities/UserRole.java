package ais.io.workgym.entities;

public enum UserRole {
    ADMIN("admin"), // posicao 0
    USER("user");   // posicao 1

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
