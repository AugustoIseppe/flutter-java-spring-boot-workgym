package ais.io.workgym.dto.userExercise;

import ais.io.workgym.entities.WeekDay;

import java.util.UUID;

public class UserExerciseItemDTO {
    private UUID exerciseId;
    private WeekDay weekDay;
    private Integer series;
    private Integer repetitions;
    private String observation;

    public UserExerciseItemDTO() {
    }

    public UserExerciseItemDTO(UUID exerciseId, WeekDay weekDay, Integer series, Integer repetitions, String observation) {
        this.exerciseId = exerciseId;
        this.weekDay = weekDay;
        this.series = series;
        this.repetitions = repetitions;
        this.observation = observation;
    }

    public UUID getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(UUID exerciseId) {
        this.exerciseId = exerciseId;
    }

    public WeekDay getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(WeekDay weekDay) {
        this.weekDay = weekDay;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Integer getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(Integer repetitions) {
        this.repetitions = repetitions;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }
}