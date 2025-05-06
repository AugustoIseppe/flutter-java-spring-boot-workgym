package ais.io.workgym.entities;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "tb_user_exercise")
public class UserExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User users;

    @ManyToOne(fetch = FetchType.LAZY)
    private Exercise exercise;

    @Enumerated(EnumType.STRING)
    private WeekDay weekDay;
    private Integer series;
    private Integer repetitions;
    private String observation;

    public UserExercise() {
    }

    public UserExercise(UUID id, User users, Exercise exercise, WeekDay weekDay, Integer series, Integer repetitions, String observation) {
        this.id = id;
        this.users = users;
        this.exercise = exercise;
        this.weekDay = weekDay;
        this.series = series;
        this.repetitions = repetitions;
        this.observation = observation;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return users;
    }

    public void setUser(User user) {
        this.users = user;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;

        UserExercise that = (UserExercise) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
