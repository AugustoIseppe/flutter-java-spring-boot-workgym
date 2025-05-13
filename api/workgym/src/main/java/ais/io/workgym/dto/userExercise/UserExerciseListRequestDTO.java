package ais.io.workgym.dto.userExercise;

import ais.io.workgym.entities.WeekDay;

import java.util.List;
import java.util.UUID;

public class UserExerciseListRequestDTO {
    private UUID userId;
    private List<UserExerciseItemDTO> exercises;

    public UserExerciseListRequestDTO() {
    }

    public UserExerciseListRequestDTO(List<UserExerciseItemDTO> exercises, UUID userId) {
        this.exercises = exercises;
        this.userId = userId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<UserExerciseItemDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<UserExerciseItemDTO> exercises) {
        this.exercises = exercises;
    }
}

