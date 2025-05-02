package ais.io.workgym.dto;

import ais.io.workgym.entities.SocialMedia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class SocialMediaDTO {

    private UUID uuid;

    @NotBlank
    @Size(min = 3, max = 80, message = "O nome precisa ter de 3 a 80 caracteres")
    private String name;

    @NotBlank
    @Size(min = 3, max = 255, message = "Link inválido")
    private String link;

    public SocialMediaDTO() {}

    public SocialMediaDTO(UUID uuid, String name, String link) {
        this.uuid = uuid;
        this.name = name;
        this.link = link;
    }

    public SocialMediaDTO(SocialMedia socialMediaEntity) {
        uuid = socialMediaEntity.getUuid();
        name = socialMediaEntity.getName();
        link = socialMediaEntity.getLink();
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getName() {
        return name;
    }

    public String getLink() {
        return link;
    }
}
