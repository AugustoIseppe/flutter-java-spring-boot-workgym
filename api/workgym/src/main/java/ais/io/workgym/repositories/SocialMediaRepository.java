package ais.io.workgym.repositories;

import ais.io.workgym.entities.SocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SocialMediaRepository extends JpaRepository<SocialMedia, UUID> {
}
