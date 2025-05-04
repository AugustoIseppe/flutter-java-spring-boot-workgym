package ais.io.workgym.controllers;

import ais.io.workgym.dto.socialmedia.SocialMediaDTO;
import ais.io.workgym.services.SocialMediaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/social-media")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @PostMapping
    public ResponseEntity<SocialMediaDTO> insert(@Valid @RequestBody SocialMediaDTO socialMediaDTO) {
        socialMediaDTO = socialMediaService.insert(socialMediaDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(socialMediaDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(socialMediaDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SocialMediaDTO> update(@PathVariable UUID id, @Valid @RequestBody SocialMediaDTO socialMediaDTO) {
        socialMediaDTO = socialMediaService.update(id, socialMediaDTO);
        return ResponseEntity.ok(socialMediaDTO);
    }

    @GetMapping
    public ResponseEntity<List<SocialMediaDTO>> findAll() {
        List<SocialMediaDTO> result = socialMediaService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SocialMediaDTO> findById(@PathVariable UUID id) {
        SocialMediaDTO socialMediaDTO = socialMediaService.findById(id);
        return ResponseEntity.ok(socialMediaDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        socialMediaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
