package br.com.fortunecap.pessoas.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "documento-identificacao")
public class DocumentoDeIdentificacao {
    @Id
    private String id;
    private String tipo; // RG, CPF, Passaporte, etc.
    private String numero;
    private LocalDate dataEmissao;
    private String orgaoEmissor;
    private String estadoEmissor;
    private LocalDate dataValidade; // Pode ser nulo para documentos sem validade
}
