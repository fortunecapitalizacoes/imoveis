package br.com.fortunecap.contrato.application.dtos;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "imoveis")
public class Imovel {

    @Id
    private String id;
    
    private String tipo;
    private String endereco;
    private Double areaTotal;
    private Double areaConstruida;
    private Integer quartos;
    private Integer banheiros;
    private Integer vagasGaragem;
    private Double preco;
    private String descricao;
    private String status; // Disponível, alugado, vendido
    private List<String> imagens;
    private List<String> videos;
    private Localizacao localizacao;
}
