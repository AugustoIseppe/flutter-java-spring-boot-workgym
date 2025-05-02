package ais.io.workgym.services;

import ais.io.workgym.dto.SocialMediaDTO;
import ais.io.workgym.entities.SocialMedia;
import ais.io.workgym.repositories.SocialMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private void copyDtoToEntity(SocialMediaDTO socialMediaDTO, SocialMedia socialMediaEntity) {
        socialMediaEntity.setName(socialMediaDTO.getName());
        socialMediaEntity.setLink(socialMediaDTO.getLink());
    }
}
