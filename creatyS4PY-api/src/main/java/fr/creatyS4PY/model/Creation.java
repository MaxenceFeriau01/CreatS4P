package fr.creatyS4PY.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "creations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Creation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String pseudo;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "type_creation")
    private String typeCreation;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Column(name = "est_anonyme")
    private Boolean estAnonyme;

    @OneToMany(mappedBy = "creation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactions;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }
}