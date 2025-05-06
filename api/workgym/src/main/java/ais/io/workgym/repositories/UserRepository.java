package ais.io.workgym.repositories;

import ais.io.workgym.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByLogin(String login);

    User findByEmail(String email);

    User findByCpf(String cpf);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);
}
