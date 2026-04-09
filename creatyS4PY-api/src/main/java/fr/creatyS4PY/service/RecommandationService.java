package fr.creatyS4PY.service;

import fr.creatyS4PY.dto.RecommandationRequest;
import fr.creatyS4PY.dto.RecommandationResponse;
import fr.creatyS4PY.model.Activite;
import fr.creatyS4PY.model.Creation;
import fr.creatyS4PY.repository.ActiviteRepository;
import fr.creatyS4PY.repository.CreationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommandationService {

    private final ActiviteRepository activiteRepository;
    private final CreationRepository creationRepository;

    public List<RecommandationResponse> recommander(RecommandationRequest request) {
        List<RecommandationResponse> resultats = new ArrayList<>();

        // ── 1. Activités officielles ─────────────────────────────────
        List<Activite> activites = activiteRepository.findAll();
        for (Activite activite : activites) {
            int score = calculerScoreActivite(activite, request);
            if (score > 0) {
                resultats.add(RecommandationResponse.builder()
                    .activite(activite)
                    .score(score)
                    .coupDeCoeur(false)
                    .build());
            }
        }

        // ── 2. Créations communautaires avec étapes (mode complet) ───
        List<Creation> creationsActivites = creationRepository.findByEstActiviteTrueOrderByDateCreationDesc();
        for (Creation creation : creationsActivites) {
            int score = calculerScoreCreation(creation, request);
            if (score > 0) {
                // On convertit la création en Activite pour réutiliser la structure existante
                Activite activiteFromCreation = Activite.builder()
                    .id(-(creation.getId())) // ID négatif pour distinguer des activités officielles
                    .titre(creation.getTitre())
                    .description(creation.getDescription())
                    .icone("🌟")
                    .couleur("#FFF3CD")
                    .dureeMinutes(creation.getDureeMinutes())
                    .difficulte(Activite.Difficulte.FACILE)
                    .materiaux(creation.getMateriaux())
                    .etapes(creation.getEtapes())
                    .ages(creation.getAges())
                    .tags(List.of(creation.getTypeCreation() != null ? creation.getTypeCreation() : "Communauté"))
                    .fichePro(false)
                    .build();

                resultats.add(RecommandationResponse.builder()
                    .activite(activiteFromCreation)
                    .score(score)
                    .coupDeCoeur(false)
                    .creationCommunaute(true)
                    .creationId(creation.getId())
                    .auteurCreation(creation.getEstAnonyme() != null && creation.getEstAnonyme()
                        ? "Anonyme"
                        : creation.getPseudo())
                    .build());
            }
        }

        // ── 3. Trier par score, marquer le meilleur, limiter à 6 ────
        return resultats.stream()
            .sorted(Comparator.comparingInt(RecommandationResponse::getScore).reversed())
            .limit(6)
            .collect(Collectors.toList());
    }

    // ── Score pour une activité officielle ───────────────────────────
    private int calculerScoreActivite(Activite activite, RecommandationRequest request) {
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

    // ── Score pour une création communautaire ────────────────────────
    private int calculerScoreCreation(Creation creation, RecommandationRequest request) {
        int score = 0;

        // Score de base : c'est une création communautaire avec étapes = bonus
        score += 1;

        // Âge
        if (request.getAge() != null && creation.getAges() != null) {
            if (creation.getAges().contains(request.getAge())) score += 2;
        }

        // Type de création ↔ goûts
        if (request.getGouts() != null && creation.getTypeCreation() != null) {
            String type = creation.getTypeCreation().toLowerCase();
            for (String gout : request.getGouts()) {
                if (type.contains(gout) || gout.contains(type)) score += 1;
            }
        }

        return score;
    }
}