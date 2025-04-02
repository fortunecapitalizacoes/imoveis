package br.com.fortunecap.communs.application.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentoDeIdentificacao {
	private String id;
    private String tipo; // RG, CPF, Passaporte, etc.
    private String numero;
    private LocalDate dataEmissao;
    private String orgaoEmissor;
    private String estadoEmissor;
    private LocalDate dataValidade; 
}
