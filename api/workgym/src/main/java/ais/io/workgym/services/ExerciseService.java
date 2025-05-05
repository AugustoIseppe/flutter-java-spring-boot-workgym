package ais.io.workgym.services;

import ais.io.workgym.dto.exercise.ExerciseRequestDTO;
import ais.io.workgym.dto.exercise.ExerciseResponseDTO;
import ais.io.workgym.entities.Exercise;
import ais.io.workgym.repositories.ExerciseRepository;
import ais.io.workgym.services.exceptions.DatabaseException;
import ais.io.workgym.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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

    @Transactional
    public ExerciseResponseDTO update(UUID id, ExerciseRequestDTO exerciseRequestDTO) {
        try {
            Exercise exerciseEntity = exerciseRepository.getReferenceById(id);
            copyDtoToEntity(exerciseRequestDTO, exerciseEntity);
            exerciseEntity = exerciseRepository.save(exerciseEntity);
            return new ExerciseResponseDTO(exerciseEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Exercício não encontrado");
        }
    }

    @Transactional
    public List<ExerciseResponseDTO> findAll() {
        List<Exercise> exerciseEntity = exerciseRepository.findAll();
        return exerciseEntity.stream().map(ExerciseResponseDTO::new).toList();
    }

    @Transactional
    public ExerciseResponseDTO findById(UUID id) {
        Exercise exerciseEntity = exerciseRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Exercício não encontrado")
        );
        return new ExerciseResponseDTO(exerciseEntity);
    }

    @Transactional
    public void delete(UUID id) {
        if (!exerciseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exercício não encontrado");
        }

        try {
            exerciseRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Erro de integridade referencial");
        }
    }

    private void copyDtoToEntity(ExerciseRequestDTO exerciseRequestDTO, Exercise exerciseEntity) {
        exerciseEntity.setName(exerciseRequestDTO.getName());
        exerciseEntity.setDescription(exerciseRequestDTO.getDescription());
        exerciseEntity.setMuscleGroup(exerciseRequestDTO.getMuscleGroup());
        exerciseEntity.setEquipment(exerciseRequestDTO.getEquipment());
        exerciseEntity.setImage(exerciseRequestDTO.getImage());
    }
}
