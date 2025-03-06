package br.com.fortune.fortuneimoveis.gestaoimoveis.domain.models;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Localizacao {
    private Double latitude;
    private Double longitude;
}
