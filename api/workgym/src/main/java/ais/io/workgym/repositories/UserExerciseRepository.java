package ais.io.workgym.repositories;

import ais.io.workgym.entities.UserExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserExerciseRepository extends JpaRepository<UserExercise, UUID> {
}
