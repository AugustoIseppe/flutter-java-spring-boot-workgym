package ais.io.workgym.services;

import ais.io.workgym.dto.exercise.ExerciseRequestDTO;
import ais.io.workgym.dto.user.UserRequestDTO;
import ais.io.workgym.dto.user.UserResponseDTO;
import ais.io.workgym.entities.Exercise;
import ais.io.workgym.entities.User;
import ais.io.workgym.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserResponseDTO insert(UserRequestDTO userRequestDTO) {
        User userEntity = new User();
        copyDtoToEntity(userRequestDTO, userEntity);
        userEntity = userRepository.save(userEntity);
        return new UserResponseDTO(userEntity);
    }

    private void copyDtoToEntity(UserRequestDTO userRequestDTO, User userEntity) {
        userEntity.setName(userRequestDTO.getName());
        userEntity.setEmail(userRequestDTO.getEmail());
        userEntity.setPassword(userRequestDTO.getPassword());
        userEntity.setCpf(userRequestDTO.getCpf());
    }
}
