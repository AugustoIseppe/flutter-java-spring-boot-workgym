package ais.io.workgym.dto;

import ais.io.workgym.entities.UserRole;

public record RegisterDTO(String login, String password, String name, String email, UserRole role, String cpf) {
}
