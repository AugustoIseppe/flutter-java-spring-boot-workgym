package ais.io.workgym.dto.user;

import ais.io.workgym.entities.User;

import java.util.UUID;

public class UserResponseDTO {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private String cpf;

    public UserResponseDTO() {
    }

    public UserResponseDTO(UUID id, String name, String email, String password, String cpf) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
    }

    public UserResponseDTO(User userEntity) {
        id = userEntity.getId();
        name = userEntity.getName();
        email = userEntity.getEmail();
        password = userEntity.getPassword();
        cpf = userEntity.getCpf();
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCpf() {
        return cpf;
    }
}
