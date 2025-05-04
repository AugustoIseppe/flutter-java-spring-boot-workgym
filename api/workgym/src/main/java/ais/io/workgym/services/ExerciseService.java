package ais.io.workgym.services;

import ais.io.workgym.dto.exercise.ExerciseRequestDTO;
import ais.io.workgym.dto.exercise.ExerciseResponseDTO;
import ais.io.workgym.entities.Exercise;
import ais.io.workgym.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Transactional
    public ExerciseResponseDTO insert(ExerciseRequestDTO exerciseRequestDTO) {
        Exercise exerciseEntity = new Exercise();
        copyDtoToEntity(exerciseRequestDTO, exerciseEntity);
        exerciseEntity = exerciseRepository.save(exerciseEntity);
        return new ExerciseResponseDTO(exerciseEntity);
    }

    private void copyDtoToEntity(ExerciseRequestDTO exerciseRequestDTO, Exercise exerciseEntity) {
        exerciseEntity.setName(exerciseRequestDTO.getName());
        exerciseEntity.setDescription(exerciseRequestDTO.getDescription());
        exerciseEntity.setMuscleGroup(exerciseRequestDTO.getMuscleGroup());
        exerciseEntity.setEquipment(exerciseRequestDTO.getEquipment());
        exerciseEntity.setImage(exerciseRequestDTO.getImage());
    }
}
