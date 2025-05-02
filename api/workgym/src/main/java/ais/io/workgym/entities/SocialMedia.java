package ais.io.workgym.entities;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "tb_social_media")
public class SocialMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String link;

    public SocialMedia() {
    }

    public SocialMedia(UUID id, String name, String link) {
        this.id = id;
        this.name = name;
        this.link = link;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;

        SocialMedia that = (SocialMedia) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(link, that.link);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id);
        result = 31 * result + Objects.hashCode(name);
        result = 31 * result + Objects.hashCode(link);
        return result;
    }
}
