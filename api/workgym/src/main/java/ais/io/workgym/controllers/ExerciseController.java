package ais.io.workgym.controllers;

import ais.io.workgym.dto.exercise.ExerciseRequestDTO;
import ais.io.workgym.dto.exercise.ExerciseResponseDTO;
import ais.io.workgym.services.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExerciseResponseDTO> insert(@Valid @RequestBody ExerciseRequestDTO exerciseRequestDTO) {
        ExerciseResponseDTO exerciseResponseDTO = exerciseService.insert(exerciseRequestDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(exerciseResponseDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(exerciseResponseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ExerciseResponseDTO> update(@PathVariable UUID id, @Valid @RequestBody ExerciseRequestDTO exerciseRequestDTO) {
        ExerciseResponseDTO exerciseResponseDTO = exerciseService.update(id, exerciseRequestDTO);
        return ResponseEntity.ok(exerciseResponseDTO);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping
    public ResponseEntity<List<ExerciseResponseDTO>> findAll() {
        List<ExerciseResponseDTO> exerciseResponseDTOList = exerciseService.findAll();
        return ResponseEntity.ok(exerciseResponseDTOList);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponseDTO> findById(@PathVariable UUID id) {
        ExerciseResponseDTO exerciseResponseDTO = exerciseService.findById(id);
        return ResponseEntity.ok(exerciseResponseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        exerciseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
