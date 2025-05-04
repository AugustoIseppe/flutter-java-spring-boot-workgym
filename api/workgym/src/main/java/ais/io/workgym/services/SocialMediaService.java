package ais.io.workgym.services;

import ais.io.workgym.dto.socialmedia.SocialMediaDTO;
import ais.io.workgym.entities.SocialMedia;
import ais.io.workgym.repositories.SocialMediaRepository;
import ais.io.workgym.services.exceptions.DatabaseException;
import ais.io.workgym.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class SocialMediaService {

    @Autowired
    private SocialMediaRepository socialMediaRepository;

    @Transactional
    public SocialMediaDTO insert(SocialMediaDTO socialMediaDTO) {
        SocialMedia socialMediaEntity = new SocialMedia();
        copyDtoToEntity(socialMediaDTO, socialMediaEntity);
        socialMediaEntity = socialMediaRepository.save(socialMediaEntity);
        return new SocialMediaDTO(socialMediaEntity);
    }

    @Transactional
    public SocialMediaDTO update(UUID id, SocialMediaDTO socialMediaDTO) {
        try {
            SocialMedia socialMediaEntity = socialMediaRepository.getReferenceById(id);
            copyDtoToEntity(socialMediaDTO, socialMediaEntity);
            socialMediaEntity = socialMediaRepository.save(socialMediaEntity);
            return new SocialMediaDTO(socialMediaEntity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Rede social não encontrada");
        }
    }

    @Transactional(readOnly = true)
    public List<SocialMediaDTO> findAll() {
        List<SocialMedia> result = socialMediaRepository.findAll();
        return result.stream().map(socialMediaEntity -> new SocialMediaDTO(socialMediaEntity)).toList();
    }

    @Transactional
    public SocialMediaDTO findById(UUID id) {
        SocialMedia socialMedia = socialMediaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Rede Social não encontrada"));
        return new SocialMediaDTO(socialMedia);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(UUID id) {
        if (!socialMediaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Rede Social não encontrada");
        }

        try {
            socialMediaRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    private void copyDtoToEntity(SocialMediaDTO socialMediaDTO, SocialMedia socialMediaEntity) {
        socialMediaEntity.setName(socialMediaDTO.getName());
        socialMediaEntity.setLink(socialMediaDTO.getLink());
    }
}
