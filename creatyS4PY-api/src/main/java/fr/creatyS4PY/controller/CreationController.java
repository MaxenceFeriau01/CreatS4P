package fr.creatyS4PY.controller;

import fr.creatyS4PY.model.Creation;
import fr.creatyS4PY.model.Reaction;
import fr.creatyS4PY.repository.CreationRepository;
import fr.creatyS4PY.repository.ReactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/creations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CreationController {

    private final CreationRepository creationRepository;
    private final ReactionRepository reactionRepository;

    @GetMapping
    public ResponseEntity<List<Creation>> getAll() {
        return ResponseEntity.ok(creationRepository.findAllByOrderByDateCreationDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Creation> getById(@PathVariable Long id) {
        return creationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Creation> create(@RequestBody Creation creation) {
        return ResponseEntity.ok(creationRepository.save(creation));
    }

    @PostMapping("/{id}/reactions")
    public ResponseEntity<Reaction> addReaction(
            @PathVariable Long id,
            @RequestBody Reaction reaction) {
        return creationRepository.findById(id).map(creation -> {
            reaction.setCreation(creation);
            return ResponseEntity.ok(reactionRepository.save(reaction));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/reactions")
    public ResponseEntity<List<Reaction>> getReactions(@PathVariable Long id) {
        return ResponseEntity.ok(reactionRepository.findByCreationId(id));
    }
}