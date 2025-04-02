package br.com.fortunecap.communs.application.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PessoalDTO {
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
