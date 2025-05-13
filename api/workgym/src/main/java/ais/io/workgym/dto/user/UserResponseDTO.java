package ais.io.workgym.dto.user;

import ais.io.workgym.entities.User;

import java.util.UUID;

public class UserResponseDTO {

    private UUID id;
    private String login;
    private String name;
    private String email;
    private String password;
    private String cpf;
    private String role;

    public UserResponseDTO() {
    }

    public UserResponseDTO(UUID id, String login, String name, String email, String password, String cpf, String role) {
        this.id = id;
        this.login = login;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.role = role;
    }

    public UserResponseDTO(User userEntity) {
        id = userEntity.getId();
        login = userEntity.getLogin();
        name = userEntity.getName();
        email = userEntity.getEmail();
        password = userEntity.getPassword();
        cpf = userEntity.getCpf();
        role = userEntity.getRole().name();
    }

    public UUID getId() {
        return id;
    }

    public String getLogin() {
        return login;
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

    public String getRole() {
        return role;
    }
}
