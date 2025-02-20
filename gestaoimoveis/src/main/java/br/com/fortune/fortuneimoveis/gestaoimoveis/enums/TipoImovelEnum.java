package br.com.fortune.fortuneimoveis.gestaoimoveis.enums;

public enum TipoImovelEnum {

	CASA("Casa"),
    APARTAMENTO("Apartamento"),
    TERRENO("Terreno"),
    SALA("Sala"),
    COMERCIAL("Comercial"),
    LOJA("Loja");

    private final String descricao;

    TipoImovelEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
    
    @Override
    public String toString() {
        return this.descricao;
    }

	
}
