package fr.creatyS4PY.controller;

import fr.creatyS4PY.dto.RecommandationRequest;
import fr.creatyS4PY.dto.RecommandationResponse;
import fr.creatyS4PY.service.RecommandationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recommandations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RecommandationController {

    private final RecommandationService recommandationService;

    @PostMapping
    public ResponseEntity<List<RecommandationResponse>> recommander(
            @RequestBody RecommandationRequest request) {
        return ResponseEntity.ok(recommandationService.recommander(request));
    }
}