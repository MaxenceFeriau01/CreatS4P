package fr.creatyS4PY.dto;

import fr.creatyS4PY.model.Activite;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommandationResponse {

    private Activite activite;
    private Integer score;
    private Boolean coupDeCoeur;

    /** true si la suggestion vient d'une création communautaire */
    private Boolean creationCommunaute;

    /** ID de la création originale (pour rediriger vers /creation/:id) */
    private Long creationId;

    /** Prénom ou pseudo de la personne qui a créé */
    private String auteurCreation;
}