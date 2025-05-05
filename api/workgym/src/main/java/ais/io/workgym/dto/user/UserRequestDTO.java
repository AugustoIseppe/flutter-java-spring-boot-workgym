package ais.io.workgym.dto.user;

import ais.io.workgym.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRequestDTO {

    @NotBlank(message = "Informe o nome do usuário")
    @Size(min = 3, max = 80, message = "O nome precisa ter de 3 a 80 caracteres")
    private String name;

    @NotBlank(message = "Informe o e-mail do usuário")
    @Size(min = 3, max = 80, message = "O e-mail precisa ter de 3 a 80 caracteres")
    private String email;

    @NotBlank(message = "Informe a senha do usuário")
    @Size(min = 6, max = 80, message = "A senha precisa ter de 6 a 80 caracteres")
    private String password;

    @NotBlank(message = "Informe o CPF do usuário")
    @Size(min = 11, max = 11, message = "O CPF precisa ter 11 caracteres")
    private String cpf;

    public UserRequestDTO() {
    }

    public UserRequestDTO(String name, String email, String password, String cpf) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
    }

    public UserRequestDTO(User userEntity) {
        name = userEntity.getName();
        email = userEntity.getEmail();
        password = userEntity.getPassword();
        cpf = userEntity.getCpf();
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
