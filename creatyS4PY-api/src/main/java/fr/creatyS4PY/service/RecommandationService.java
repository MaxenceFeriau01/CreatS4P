package fr.creatyS4PY.service;

import fr.creatyS4PY.dto.RecommandationRequest;
import fr.creatyS4PY.dto.RecommandationResponse;
import fr.creatyS4PY.model.Activite;
import fr.creatyS4PY.model.Creation;
import fr.creatyS4PY.repository.ActiviteRepository;
import fr.creatyS4PY.repository.CreationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommandationService {

    private final ActiviteRepository activiteRepository;
    private final CreationRepository creationRepository;

    // ── Mapping goûts front → goûts/tags back ───────────────────────
    // Permet d'élargir la recherche à des synonymes ou tags proches
    private static final Map<String, List<String>> GOUT_ALIASES = new HashMap<>();
    static {
        GOUT_ALIASES.put("informatique", List.of("informatique", "numérique", "Informatique", "Numérique"));
        GOUT_ALIASES.put("musique",      List.of("musique", "Musique", "rythme"));
        GOUT_ALIASES.put("creer",        List.of("creer", "créer"));
        GOUT_ALIASES.put("recup",        List.of("recup", "récup", "Récup"));
        GOUT_ALIASES.put("calme",        List.of("calme", "Calme"));
        GOUT_ALIASES.put("construire",   List.of("construire", "Construire", "Construction"));
        GOUT_ALIASES.put("couleurs",     List.of("couleurs", "Couleurs"));
        GOUT_ALIASES.put("nature",       List.of("nature", "Nature"));
        GOUT_ALIASES.put("bijoux",       List.of("bijoux", "Bijoux", "Bijou"));
        GOUT_ALIASES.put("offrir",       List.of("offrir", "Offrir"));
    }

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
                Activite activiteFromCreation = Activite.builder()
                    .id(-(creation.getId()))
                    .titre(creation.getTitre())
                    .description(creation.getDescription())
                    .icone("🌟")
                    .couleur("#FFF3CD")
                    .dureeMinutes(creation.getDureeMinutes())
                    .difficulte(Activite.Difficulte.FACILE)
                    .materiaux(creation.getMateriaux())
                    .etapes(creation.getEtapes())
                    .ages(creation.getAges())
                    .tags(List.of(creation.getTypeCreation() != null ?
                        creation.getTypeCreation() : "Communauté"))
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
                // Correspondance directe sur les goûts
                if (activite.getGouts().contains(gout)) {
                    score += 2;
                }
                // Correspondance élargie via aliases (notamment pour informatique, musique...)
                List<String> aliases = GOUT_ALIASES.getOrDefault(gout, List.of(gout));
                if (activite.getTags() != null) {
                    for (String alias : aliases) {
                        if (activite.getTags().stream()
                                .anyMatch(tag -> tag.equalsIgnoreCase(alias))) {
                            score += 2;
                            break; // on ne compte qu'une fois par goût
                        }
                    }
                }
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

        score += 1; // bonus de base

        if (request.getAge() != null && creation.getAges() != null) {
            if (creation.getAges().contains(request.getAge())) score += 2;
        }

        if (request.getGouts() != null && creation.getTypeCreation() != null) {
            String type = creation.getTypeCreation().toLowerCase();
            for (String gout : request.getGouts()) {
                List<String> aliases = GOUT_ALIASES.getOrDefault(gout, List.of(gout));
                for (String alias : aliases) {
                    if (type.contains(alias.toLowerCase()) || alias.toLowerCase().contains(type)) {
                        score += 1;
                        break;
                    }
                }
            }
        }

        return score;
    }
}