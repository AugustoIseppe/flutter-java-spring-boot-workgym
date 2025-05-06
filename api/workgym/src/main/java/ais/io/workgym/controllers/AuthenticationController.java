package ais.io.workgym.controllers;

import ais.io.workgym.dto.AuthenticationDTO;
import ais.io.workgym.dto.RegisterDTO;
import ais.io.workgym.entities.User;
import ais.io.workgym.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {

        if (userRepository.findByLogin(data.login()) != null) {
            return ResponseEntity.status(400).body("User already exists");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User user = new User(
                data.name(),
                data.email(),
                encryptedPassword,
                data.cpf(),
                data.login(),
                data.role()
        );


        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

}
