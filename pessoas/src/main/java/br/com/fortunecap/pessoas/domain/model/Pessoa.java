package br.com.fortunecap.pessoas.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "pessoa")
public class Pessoa {
    @Id
    private String id;

    private String nome;
    private String dataNascimento;
    private String cpf;
    private DocumentoDeIdentificacao documentoDeIdentificacao;
    private String mae;
    private String pai;
    private Endereco endereco;
    private String profissao;
    private String escolaridade;
}
