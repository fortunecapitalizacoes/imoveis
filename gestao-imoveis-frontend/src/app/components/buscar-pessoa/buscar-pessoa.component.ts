import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './pessoa-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar-pessoa',
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [PessoaService],
  templateUrl: './buscar-pessoa.component.html',
  styleUrl: './buscar-pessoa.component.css'
})
export class BuscarPessoaComponent implements OnInit  {

  constructor( private pessoaService: PessoaService){};

  listaPessoas = [
    {
      nome: 'João Silva',
      dataNascimento: '15/08/1990',
      cpf: '123.456.789-00',
      documentoDeIdentificacao: {
        tipo: 'RG',
        numero: '12.345.678-9',
        dataEmissao: '10/01/2010',
        orgaoEmissor: 'SSP',
        estadoEmissor: 'SP',
        dataValidade: ''
      },
      mae: 'Maria Silva',
      pai: 'Carlos Silva',
      endereco: {
        logradouro: 'Rua das Flores',
        numero: '123',
        complemento: 'Apto 12',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        pais: 'Brasil'
      },
      profissao: 'Engenheiro',
      escolaridade: 'Ensino Superior'
    }
  ];

  pessoaSelecionada: any = null;

  ngOnInit(): void {
    this.carregarImoveis();
  }

  abrirModal(pessoa: any) {
    this.pessoaSelecionada = pessoa;
  }

  fecharModal() {
    this.pessoaSelecionada = null;
  }

  carregarImoveis(): void {
    debugger
    this.pessoaService.listar().subscribe(
      (pessoas) => {
        this.listaPessoas = pessoas;
        debugger
          console.log('Lista de imóveis carregada:', this.listaPessoas);
      },
      (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar imóvel.');
      }
    );
    
    
   
  }

}
