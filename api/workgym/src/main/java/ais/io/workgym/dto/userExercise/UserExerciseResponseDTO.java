package ais.io.workgym.dto.userExercise;

import ais.io.workgym.entities.Exercise;
import ais.io.workgym.entities.User;
import ais.io.workgym.entities.UserExercise;
import ais.io.workgym.entities.WeekDay;

import java.util.UUID;

public class UserExerciseResponseDTO {
    private UUID id;
    private User user;
    private Exercise exercise;
    private WeekDay weekDay;
    private Integer series;
    private Integer repetitions;
    private String observation;

    public UserExerciseResponseDTO() {
    }

    public UserExerciseResponseDTO(UUID id, User user, Exercise exercise, WeekDay weekDay, Integer series, Integer repetitions, String observation) {
        this.id = id;
        this.user = user;
        this.exercise = exercise;
        this.weekDay = weekDay;
        this.series = series;
        this.repetitions = repetitions;
        this.observation = observation;
    }

    public UserExerciseResponseDTO(UserExercise userExerciseEntity) {
        id = userExerciseEntity.getId();
        user = userExerciseEntity.getUser();
        exercise = userExerciseEntity.getExercise();
        weekDay = userExerciseEntity.getWeekDay();
        series = userExerciseEntity.getSeries();
        repetitions = userExerciseEntity.getRepetitions();
        observation = userExerciseEntity.getObservation();
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public WeekDay getWeekDay() {
        return weekDay;
    }

    public Integer getSeries() {
        return series;
    }

    public Integer getRepetitions() {
        return repetitions;
    }

    public String getObservation() {
        return observation;
    }
}
