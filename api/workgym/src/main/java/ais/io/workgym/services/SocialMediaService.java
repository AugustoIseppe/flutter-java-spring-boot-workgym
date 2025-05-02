package ais.io.workgym.services;

import ais.io.workgym.dto.SocialMediaDTO;
import ais.io.workgym.entities.SocialMedia;
import ais.io.workgym.repositories.SocialMediaRepository;
import ais.io.workgym.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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



    private void copyDtoToEntity(SocialMediaDTO socialMediaDTO, SocialMedia socialMediaEntity) {
        socialMediaEntity.setName(socialMediaDTO.getName());
        socialMediaEntity.setLink(socialMediaDTO.getLink());
    }
}
