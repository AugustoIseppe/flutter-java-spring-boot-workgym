package ais.io.workgym.controllers;

import ais.io.workgym.dto.userExercise.UserExerciseRequestDTO;
import ais.io.workgym.dto.userExercise.UserExerciseResponseDTO;
import ais.io.workgym.projections.UserExerciseProjectionDTO;
import ais.io.workgym.services.UserExerciseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @PutMapping("/{id}")
    public ResponseEntity<UserExerciseResponseDTO> updateUserExercise(@PathVariable UUID id,
                                                                      @RequestBody @Valid UserExerciseRequestDTO userExerciseRequestDTO) {
        // Chama o service para atualizar o UserExercise
        UserExerciseResponseDTO updatedUserExercise = userExerciseService.update(id, userExerciseRequestDTO);

        // Retorna a resposta com o status 200 OK
        return ResponseEntity.ok(updatedUserExercise);
    }

    @GetMapping("/{userId}/day/{weekDay}")
    public ResponseEntity<List<UserExerciseProjectionDTO>> getByUserAndDay(
            @PathVariable UUID userId,
            @PathVariable String weekDay) {

        List<UserExerciseProjectionDTO> list = userExerciseService.getExercisesByUserAndWeekDay(userId, weekDay);
        return ResponseEntity.ok(list);
    }
}
