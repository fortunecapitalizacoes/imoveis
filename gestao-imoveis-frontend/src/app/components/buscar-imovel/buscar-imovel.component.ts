import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImovelService } from './imovel-service';
import { ImovelObservableService } from '../ImovelObservableService';
import { Imovel } from '../ImovelModel';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-buscar-imovel',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ImovelService],
  templateUrl: './buscar-imovel.component.html',
  styleUrls: ['./buscar-imovel.component.css']
})
export class BuscarImovelComponent implements OnInit {
  listaImoveis: Imovel[] = [];

  constructor(
    private imovelService: ImovelService,
    private imovelObservableService: ImovelObservableService
  ) {}

  ngOnInit(): void {
    this.carregarImoveis();
  }

  getUrlImagem(imovel: Imovel): string {
    if (imovel.imagens) {
      // Remove os itens null da lista
      const imagensFiltradas = imovel.imagens.filter(imagem => imagem !== null);
  
      // Verifica se a lista filtrada não está vazia
      if (imagensFiltradas.length > 0) {
        return `http://localhost:8080/imoveis/imagem/${imagensFiltradas[0]}`;
      }
    }
    return 'assets/images/default-imovel.jpg';
  }

  urlGenerantor(id: string): string {
    return `http://localhost:8080/imoveis/imagem/${id}`
  }

  editarImovel(imovel: Imovel): void {
    console.log(`Editar imóvel: ${imovel.nome}`);
    // Lógica de edição será implementada aqui
  }

  excluirImovel(imovel: Imovel): void {
    if (!imovel.id) {
      console.warn('ID do imóvel não encontrado, exclusão cancelada.');
      return;
    }

    const confirmacao = confirm(`Tem certeza que deseja excluir o imóvel "${imovel.nome}"?`);
    if (!confirmacao) return;

    this.imovelService.deletarImovel(imovel.id).subscribe({
      next: () => {
        console.log(`Imóvel "${imovel.nome}" excluído com sucesso!`);
        this.carregarImoveis();
      },
      error: (err) => {
        console.error('Erro ao excluir imóvel:', err);
      }
    });
  }

  carregarImoveis(): void {
    this.imovelService.listarImoveis().pipe(
      tap((imoveis: Imovel[]) => {
        this.listaImoveis = imoveis;
        console.log('Lista de imóveis carregada:', this.listaImoveis);
      }),
      catchError(error => {
        console.error('Erro ao carregar imóveis:', error);
        return of([]);
      })
    ).subscribe();
  }

  enviarImovel(imovel: Imovel): void {
    const imagensList = imovel.imagens?.map(element => this.urlGenerantor(element)) || [];
    imovel.imagens = [...imagensList]; // Usando spread para substituir as imagens
  
    this.imovelObservableService.setImovel(imovel);
  }
}
