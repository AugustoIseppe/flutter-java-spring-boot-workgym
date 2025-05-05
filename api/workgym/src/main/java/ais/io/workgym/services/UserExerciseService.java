package ais.io.workgym.services;

import ais.io.workgym.dto.userExercise.UserExerciseRequestDTO;
import ais.io.workgym.dto.userExercise.UserExerciseResponseDTO;
import ais.io.workgym.entities.Exercise;
import ais.io.workgym.entities.User;
import ais.io.workgym.entities.UserExercise;
import ais.io.workgym.projections.UserExerciseProjectionDTO;
import ais.io.workgym.repositories.ExerciseRepository;
import ais.io.workgym.repositories.UserExerciseRepository;
import ais.io.workgym.repositories.UserRepository;
import ais.io.workgym.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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

    @Transactional
    public UserExerciseResponseDTO update(UUID id, UserExerciseRequestDTO userExerciseRequestDTO) {
        // Verifica se o UserExercise existe
        UserExercise userExercise = userExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercício do usuário não encontrado"));

        // Verifica se o usuário existe
        User user = userRepository.findById(userExerciseRequestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        // Verifica se o exercício existe
        Exercise exercise = exerciseRepository.findById(userExerciseRequestDTO.getExerciseId())
                .orElseThrow(() -> new ResourceNotFoundException("Exercício não encontrado"));

        // Atualiza os dados do UserExercise com os dados do DTO
        userExercise.setUser(user);
        userExercise.setExercise(exercise);
        userExercise.setWeekDay(userExerciseRequestDTO.getWeekDay());
        userExercise.setSeries(userExerciseRequestDTO.getSeries());
        userExercise.setRepetitions(userExerciseRequestDTO.getRepetitions());
        userExercise.setObservation(userExerciseRequestDTO.getObservation());

        // Salva o UserExercise atualizado
        userExercise = userExerciseRepository.save(userExercise);

        // Retorna o UserExerciseResponseDTO com os dados atualizados
        return new UserExerciseResponseDTO(userExercise);
    }

    public List<UserExerciseProjectionDTO> getExercisesByUserAndWeekDay(UUID userId, String weekDay) {
        List<Object[]> rows = userExerciseRepository.findRawUserExercisesByUserIdAndWeekDay(userId, weekDay.toUpperCase());

        return rows.stream()
                .map(row -> new UserExerciseProjectionDTO(
                        (String) row[0],       // name
                        (String) row[1],       // description
                        (String) row[2],       // image ✅
                        (Integer) row[3],      // series ✅
                        (Integer) row[4],      // repetitions ✅
                        (String) row[5]        // observation ✅
                ))
                .toList();
    }

    @Transactional
    public List<UserExerciseProjectionDTO> findAll() {
        List<UserExercise> userExercises = userExerciseRepository.findAll();
        return userExercises.stream()
                .map(userExercise -> new UserExerciseProjectionDTO(
                        userExercise.getExercise().getName(),
                        userExercise.getExercise().getDescription(),
                        userExercise.getExercise().getImage(),
                        userExercise.getSeries(),
                        userExercise.getRepetitions(),
                        userExercise.getObservation()
                ))
                .toList();
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

