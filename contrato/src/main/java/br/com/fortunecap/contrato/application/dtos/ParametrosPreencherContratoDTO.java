package br.com.fortunecap.contrato.application.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParametrosPreencherContratoDTO {

    // Dados do Locador
    private String nomeLocador;
    private String nacionalidadeLocador;
    private String estadoCivilLocador;
    private String profissaoLocador;
    private String rgLocador;
    private String cpfLocador;
    private String enderecoLocador;
    private String dadosBancariosLocador;

    // Dados do Locatário
    private String nomeLocatario;
    private String nacionalidadeLocatario;
    private String estadoCivilLocatario;
    private String profissaoLocatario;
    private String rgLocatario;
    private String cpfLocatario;
    private String enderecoLocatario;

    // Dados do Imóvel e Contrato
    private String enderecoImovel;
    private String caracteristicasImovel;
    private Integer numeroMesesOuAnos;
    private String dataInicio;
    private String dataTermino;
    private Double valor;
    private String valorPorExtenso;
    private Integer diaDoMes;
    private String metodoPagamento;
    private Double percentualMultaJuros;
    private String indiceCorrecao;
    private String tipoGarantia;
    private Double valorGarantia;
    private String dataDeposito;
    private Integer mesesMultaRescisao;
    private String cidadeForo;
    private Integer numeroViasContrato;
    private String dataAssinatura;
}
