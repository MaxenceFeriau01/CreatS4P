package fr.creatyS4PY.service;

import fr.creatyS4PY.dto.RecommandationRequest;
import fr.creatyS4PY.dto.RecommandationResponse;
import fr.creatyS4PY.model.Activite;
import fr.creatyS4PY.repository.ActiviteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommandationService {

    private final ActiviteRepository activiteRepository;

    public List<RecommandationResponse> recommander(RecommandationRequest request) {
        List<Activite> toutes = activiteRepository.findAll();

        return toutes.stream()
            .map(activite -> {
                int score = calculerScore(activite, request);
                return RecommandationResponse.builder()
                    .activite(activite)
                    .score(score)
                    .coupDeCoeur(false)
                    .build();
            })
            .filter(r -> r.getScore() > 0)
            .sorted((a, b) -> b.getScore() - a.getScore())
            .limit(4)
            .collect(Collectors.toList());
    }

    private int calculerScore(Activite activite, RecommandationRequest request) {
        int score = 0;

        if (request.getGouts() != null && activite.getGouts() != null) {
            for (String gout : request.getGouts()) {
                if (activite.getGouts().contains(gout)) score += 2;
            }
        }

        if (request.getMotric() != null && activite.getMotric() != null) {
            if (activite.getMotric().contains(request.getMotric())) score += 1;
        }

        if (request.getAge() != null && activite.getAges() != null) {
            if (activite.getAges().contains(request.getAge())) score += 1;
        }

        return score;
    }
}