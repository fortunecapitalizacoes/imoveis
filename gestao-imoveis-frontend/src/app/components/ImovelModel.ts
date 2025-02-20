  export interface Imovel {
    id?: string;
    nome: string;
    endereco: string;
    preco: number;
    descricao?: string;
    imagens?: string[];
    areaConstruida: number;
    areaTotal: number;
    banheiros: number;
    localizacao?: string | null;
    quartos: number;
    status: string;
    tipo: string;
    vagasGaragem: number;
    videos?: string[];
  }