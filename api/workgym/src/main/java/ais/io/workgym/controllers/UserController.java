package ais.io.workgym.controllers;

import ais.io.workgym.dto.PasswordResetDTO;
import ais.io.workgym.dto.user.ChangePasswordDTO;
import ais.io.workgym.dto.user.UserRequestDTO;
import ais.io.workgym.dto.user.UserResponseDTO;
import ais.io.workgym.dto.user.UserUpdateRequestDTO;
import ais.io.workgym.entities.User;
import ais.io.workgym.repositories.UserRepository;
import ais.io.workgym.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> update(@PathVariable UUID id, @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO userResponseDTO = userService.update(id, userRequestDTO);
        return ResponseEntity.ok(userResponseDTO);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<UserResponseDTO>> findAll() {
        List<UserResponseDTO> userResponseDTOList = userService.findAll();
        return ResponseEntity.ok(userResponseDTOList);
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable UUID id) {
        UserResponseDTO userResponseDTO = userService.findById(id);
        return ResponseEntity.ok(userResponseDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
