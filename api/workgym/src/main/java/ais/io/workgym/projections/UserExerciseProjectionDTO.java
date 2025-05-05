package ais.io.workgym.projections;

public class UserExerciseProjectionDTO {
    private String name;
    private String description;
    private String image;
    private Integer series;
    private Integer repetitions;
    private String observation;

    public UserExerciseProjectionDTO(String name, String description, String image, Integer series, Integer repetitions, String observation) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.series = series;
        this.repetitions = repetitions;
        this.observation = observation;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
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

    public String getImage() {
        return image;
    }
}


