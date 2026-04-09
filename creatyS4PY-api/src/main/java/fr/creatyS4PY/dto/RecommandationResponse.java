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
}