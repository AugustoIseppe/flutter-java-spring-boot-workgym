package ais.io.workgym.dto.user;


import ais.io.workgym.entities.User;

import java.util.UUID;

public record UserRegisterResponseDTO(
        UUID id,
        String name,
        String email,
        String cpf,
        String login,
        String role
) {
    public UserRegisterResponseDTO(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCpf(),
                user.getLogin(),
                user.getRole().toString()
        );
    }
}
