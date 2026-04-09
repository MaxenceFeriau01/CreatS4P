package fr.creatyS4PY.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "activites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String icone;
    private String couleur;

    @Column(name = "duree_minutes")
    private Integer dureeMinutes;

    @Enumerated(EnumType.STRING)
    private Difficulte difficulte;

    @Column(name = "conseil_accompagnant", columnDefinition = "TEXT")
    private String conseilAccompagnant;

    @Column(name = "nombre_participants")
    private String nombreParticipants;

    @ElementCollection
    @CollectionTable(name = "activite_tags")
    private List<String> tags;

    @ElementCollection
    @CollectionTable(name = "activite_gouts")
    private List<String> gouts;

    @ElementCollection
    @CollectionTable(name = "activite_motric")
    private List<String> motric;

    @ElementCollection
    @CollectionTable(name = "activite_ages")
    private List<String> ages;

    @ElementCollection
    @CollectionTable(name = "activite_materiaux")
    @Column(name = "materiau")
    private List<String> materiaux;

    @ElementCollection
    @OrderColumn(name = "etape_ordre")
    @CollectionTable(name = "activite_etapes")
    @Column(name = "etape", columnDefinition = "TEXT")
    private List<String> etapes;

    @Column(name = "fiche_pro")
    private Boolean fichePro;

    public enum Difficulte {
        FACILE, MOYEN, DIFFICILE
    }
}