package ais.io.workgym.entities;

public enum UserRole {
    ADMIN("ADMIN"), // posicao 0
    USER("USER");   // posicao 1

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
