package fr.creatyS4PY.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommandationRequest {

    private String age;
    private List<String> gouts;
    private String motric;
}