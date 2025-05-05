package ais.io.workgym.services;

import ais.io.workgym.dto.userExercise.UserExerciseRequestDTO;
import ais.io.workgym.dto.userExercise.UserExerciseResponseDTO;
import ais.io.workgym.entities.Exercise;
import ais.io.workgym.entities.User;
import ais.io.workgym.entities.UserExercise;
import ais.io.workgym.repositories.ExerciseRepository;
import ais.io.workgym.repositories.UserExerciseRepository;
import ais.io.workgym.repositories.UserRepository;
import ais.io.workgym.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserExerciseService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserExerciseRepository userExerciseRepository;

    @Transactional
    public UserExerciseResponseDTO insert(UserExerciseRequestDTO dto) {
        UserExercise entity = new UserExercise();
        copyDtoToEntity(dto, entity);
        entity = userExerciseRepository.save(entity);
        return new UserExerciseResponseDTO(entity);
    }

    private void copyDtoToEntity(UserExerciseRequestDTO dto, UserExercise entity) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        Exercise exercise = exerciseRepository.findById(dto.getExerciseId())
                .orElseThrow(() -> new ResourceNotFoundException("Exercício não encontrado"));

        entity.setUser(user);
        entity.setExercise(exercise);
        entity.setWeekDay(dto.getWeekDay());
        entity.setSeries(dto.getSeries());
        entity.setRepetitions(dto.getRepetitions());
        entity.setObservation(dto.getObservation());
    }
}

