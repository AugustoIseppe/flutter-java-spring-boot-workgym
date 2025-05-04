package ais.io.workgym.controllers;

import ais.io.workgym.dto.exercise.ExerciseRequestDTO;
import ais.io.workgym.dto.exercise.ExerciseResponseDTO;
import ais.io.workgym.services.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @PostMapping
    public ResponseEntity<ExerciseResponseDTO> insert(@Valid @RequestBody ExerciseRequestDTO exerciseRequestDTO) {
        ExerciseResponseDTO exerciseResponseDTO = exerciseService.insert(exerciseRequestDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(exerciseResponseDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(exerciseResponseDTO);
    }
}
