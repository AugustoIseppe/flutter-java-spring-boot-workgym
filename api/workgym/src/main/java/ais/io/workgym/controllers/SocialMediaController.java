package ais.io.workgym.controllers;

import ais.io.workgym.dto.SocialMediaDTO;
import ais.io.workgym.services.SocialMediaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

}
