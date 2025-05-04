package ais.io.workgym.dto.exercise;

import ais.io.workgym.entities.Exercise;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class ExerciseRequestDTO {

    @NotBlank(message = "Informe o nome do exercício")
    @Size(min = 3, max = 80, message = "O nome precisa ter de 3 a 80 caracteres")
    private String name;

    @NotBlank(message = "Informe uma descrição para esse exercício")
    @Size(min = 10, message = "A descrição precisa ter no mínimo 10 caracteres")
    private String description;

    @NotBlank(message = "Informe o grupo muscular. Ex: Peito, Costas, etc")
    @Size(min = 3, max = 80, message = "O grupo muscular precisa ter de 3 a 80 caracteres")
    private String muscleGroup;

    @NotBlank(message = "Informe o equipamento utilizado. Ex: Halteres, Barra, etc")
    @Size(min = 3, max = 80, message = "O equipamento precisa ter de 3 a 80 caracteres")
    private String equipment;

    @NotBlank(message = "Informe a imagem/gif do exercício")
    private String image;

    public ExerciseRequestDTO() {
    }

    public ExerciseRequestDTO(String name, String description, String muscleGroup, String equipment, String image) {
        this.name = name;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.equipment = equipment;
        this.image = image;
    }

    public ExerciseRequestDTO(Exercise exerciseEntity) {
        name = exerciseEntity.getName();
        description = exerciseEntity.getDescription();
        muscleGroup = exerciseEntity.getMuscleGroup();
        equipment = exerciseEntity.getEquipment();
        image = exerciseEntity.getImage();
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
