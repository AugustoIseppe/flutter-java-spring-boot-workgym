package ais.io.workgym.entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "tb_social_media")
public class SocialMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uuid;
    private String name;
    private String link;
}
