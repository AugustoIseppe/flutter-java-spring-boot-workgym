package ais.io.workgym.controllers;

import ais.io.workgym.dto.userExercise.UserExerciseRequestDTO;
import ais.io.workgym.dto.userExercise.UserExerciseResponseDTO;
import ais.io.workgym.services.UserExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-exercises")
public class UserExerciseController {

    @Autowired
    private UserExerciseService userExerciseService;

    @PostMapping
    public ResponseEntity<UserExerciseResponseDTO> insert(@RequestBody UserExerciseRequestDTO dto) {
        UserExerciseResponseDTO response = userExerciseService.insert(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
