package br.com.fortunecap.contrato.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContratoModel {

    private String id;

    private String tipo;
    private String nome;
    private String contratoId;

}
