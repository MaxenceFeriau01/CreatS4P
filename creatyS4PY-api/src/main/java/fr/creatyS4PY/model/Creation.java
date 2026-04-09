package fr.creatyS4PY.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    // ── Champs activité (mode complet) ──────────────────────────

    /** true = partage complet avec étapes/matériaux → apparaît dans les suggestions */
    @Column(name = "est_activite")
    private Boolean estActivite;

    @ElementCollection
    @CollectionTable(name = "creation_materiaux", joinColumns = @JoinColumn(name = "creation_id"))
    @Column(name = "materiau")
    @Builder.Default
    private List<String> materiaux = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "creation_etapes", joinColumns = @JoinColumn(name = "creation_id"))
    @OrderColumn(name = "etape_ordre")
    @Column(name = "etape", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> etapes = new ArrayList<>();

    /** Ages conseillés : enfant, ado, adulte */
    @ElementCollection
    @CollectionTable(name = "creation_ages", joinColumns = @JoinColumn(name = "creation_id"))
    @Column(name = "age")
    @Builder.Default
    private List<String> ages = new ArrayList<>();

    /** Durée estimée en minutes */
    @Column(name = "duree_minutes")
    private Integer dureeMinutes;

    // ── Réactions ───────────────────────────────────────────────

    @OneToMany(mappedBy = "creation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    @Builder.Default
    private List<Reaction> reactions = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
        if (this.estActivite == null) this.estActivite = false;
    }
}