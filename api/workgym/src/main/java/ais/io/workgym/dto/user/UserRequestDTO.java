package ais.io.workgym.dto.user;

import ais.io.workgym.entities.User;
import ais.io.workgym.entities.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRequestDTO {

    @NotBlank(message = "Informe o login do usuário")
    @Size(min = 3, max = 80, message = "O login precisa ter de 3 a 80 caracteres")
    private String login;

    @NotBlank(message = "Informe o nome do usuário")
    @Size(min = 3, max = 80, message = "O nome precisa ter de 3 a 80 caracteres")
    private String name;

    @NotBlank(message = "Informe o e-mail do usuário")
    @Size(min = 3, max = 80, message = "O e-mail precisa ter de 3 a 80 caracteres")
    private String email;

    //role
    @NotBlank(message = "Informe o papel do usuário")
    @Size(min = 3, max = 80, message = "O papel precisa ter de 3 a 80 caracteres")
    private UserRole role;

    @NotBlank(message = "Informe o CPF do usuário")
    @Size(min = 11, max = 11, message = "O CPF precisa ter 11 caracteres")
    private String cpf;

    public UserRequestDTO() {
    }

    public UserRequestDTO(String login, String name, String email, UserRole role, String cpf) {
        this.login = login;
        this.name = name;
        this.email = email;
        this.role = role;
        this.cpf = cpf;
    }

    public UserRequestDTO(User userEntity) {
        this.login = userEntity.getLogin();
        this.name = userEntity.getName();
        this.email = userEntity.getEmail();
        this.role = userEntity.getRole();
        this.cpf = userEntity.getCpf();
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}


