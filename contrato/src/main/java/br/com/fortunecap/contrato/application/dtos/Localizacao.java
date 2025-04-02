package br.com.fortunecap.contrato.application.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Localizacao {
    private Double latitude;
    private Double longitude;
}
