package ais.io.workgym.dto.userExercise;

public class UserExerciseDTO {
    private String name;
    private String description;
    private String muscleGroup;
    private String image;
    private String equipment;
    private Integer series;
    private String weekDay;
    private Integer repetitions;
    private String observation;

    // Construtor
    public UserExerciseDTO(String name, String description, String muscleGroup, String image,
                           String equipment, Integer series, String weekDay,
                           Integer repetitions, String observation) {
        this.name = name;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.image = image;
        this.equipment = equipment;
        this.series = series;
        this.weekDay = weekDay;
        this.repetitions = repetitions;
        this.observation = observation;
    }

    public UserExerciseDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMuscleGroup() {
        return muscleGroup;
    }

    public void setMuscleGroup(String muscleGroup) {
        this.muscleGroup = muscleGroup;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public String getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(String weekDay) {
        this.weekDay = weekDay;
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
