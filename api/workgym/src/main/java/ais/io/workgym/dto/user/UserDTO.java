package ais.io.workgym.dto.user;

import ais.io.workgym.entities.User;

public record UserDTO(
        String id,
        String name,
        String email,
        String cpf,
        String login,
        String role
) {
    public UserDTO(User user) {
        this(
                user.getId().toString(),
                user.getName(),
                user.getEmail(),
                user.getCpf(),
                user.getLogin(),
                user.getRole().name()
        );
    }
}
