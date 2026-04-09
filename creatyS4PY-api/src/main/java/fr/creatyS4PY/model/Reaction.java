package fr.creatyS4PY.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creation_id", nullable = false)
    @JsonBackReference
    private Creation creation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeReaction type;

    @Column(name = "date_reaction")
    private LocalDateTime dateReaction;

    @PrePersist
    public void prePersist() {
        this.dateReaction = LocalDateTime.now();
    }

    public enum TypeReaction {
        ETOILE, COEUR, APPLAUDISSEMENT
    }
}