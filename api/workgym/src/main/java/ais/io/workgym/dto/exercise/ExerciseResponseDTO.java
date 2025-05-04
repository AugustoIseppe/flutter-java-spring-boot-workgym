package ais.io.workgym.dto.exercise;

import ais.io.workgym.entities.Exercise;

import java.util.UUID;

public class ExerciseResponseDTO {

    private UUID id;
    private String name;
    private String description;
    private String muscleGroup;
    private String equipment;
    private String image;

    public ExerciseResponseDTO() {
    }

    public ExerciseResponseDTO(UUID id, String name, String description, String muscleGroup, String equipment, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.equipment = equipment;
        this.image = image;
    }

    public ExerciseResponseDTO(Exercise exerciseEntity) {
        id = exerciseEntity.getId();
        name = exerciseEntity.getName();
        description = exerciseEntity.getDescription();
        muscleGroup = exerciseEntity.getMuscleGroup();
        equipment = exerciseEntity.getEquipment();
        image = exerciseEntity.getImage();
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
