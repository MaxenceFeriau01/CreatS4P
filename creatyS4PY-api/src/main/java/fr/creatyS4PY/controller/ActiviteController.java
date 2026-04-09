package fr.creatyS4PY.controller;

import fr.creatyS4PY.model.Activite;
import fr.creatyS4PY.repository.ActiviteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ActiviteController {

    private final ActiviteRepository activiteRepository;

    @GetMapping
    public ResponseEntity<List<Activite>> getAll() {
        return ResponseEntity.ok(activiteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activite> getById(@PathVariable Long id) {
        return activiteRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Activite> create(@RequestBody Activite activite) {
        return ResponseEntity.ok(activiteRepository.save(activite));
    }
}