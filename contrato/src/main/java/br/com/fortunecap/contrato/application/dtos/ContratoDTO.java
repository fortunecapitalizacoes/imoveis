package br.com.fortunecap.contrato.application.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContratoDTO {

	private String idContrato;
	private String nome;
	
}
