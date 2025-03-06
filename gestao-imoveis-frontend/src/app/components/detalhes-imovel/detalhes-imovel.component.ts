import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ImovelObservableService } from '../ImovelObservableService';
import { Imovel } from '../ImovelModel';
import { filter, Subscription } from 'rxjs';

interface Midia {
  url: string;
  type: 'image' | 'video';
  // opcionalmente, um título ou descrição
  titulo?: string;
}

@Component({
    selector: 'app-detalhes-imovel',
    imports: [CommonModule],
    templateUrl: './detalhes-imovel.component.html',
    styleUrls: ['./detalhes-imovel.component.css']
})
export class DetalhesImovelComponent implements OnInit{

  imovel!: Imovel;
  midias: Midia[] = [];
  private subscription!: Subscription;

  modalImage: string | null = null;
  modalVideo: string | null = null;

  constructor(private imovelObservableService: ImovelObservableService) {}

  ngOnInit() {

    this.removeNulls(this.imovel)

    this.subscription = this.imovelObservableService.imovel$
      .pipe(filter(imovel => imovel !== null))
      .subscribe(imovel => {
        this.imovel = imovel;
        this.combinarMidias();
      });
  }

  removeNulls(imovel: Imovel): void {
    if (imovel && imovel.imagens) {
      imovel.imagens = imovel.imagens.filter(i => i !== null);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private combinarMidias() {
    // Inicializa a lista de mídias vazia
    this.midias = [];
  
    // Se houver imagens, adiciona-as como tipo "image"
    if (this.imovel.imagens && this.imovel.imagens.length > 0) {
      const imagens: Midia[] = this.imovel.imagens
        .filter(url => url && url.trim() !== null) // Filtra valores null, undefined ou strings vazias
        .map(url => ({ url, type: 'image' }));
  
      this.midias.push(...imagens);
    }
  
    // Se houver vídeos, adiciona-os como tipo "video"
    if (this.imovel.videos && this.imovel.videos.length > 0) {
      const videos: Midia[] = this.imovel.videos
        .filter(url => url && url.trim() !== null) // Filtra valores null, undefined ou strings vazias
        .map(url => ({ url, type: 'video' }));
  
      this.midias.push(...videos);
    }
  }
  
  
  abrirModal(midia: Midia) {
    console.log("Abrindo mídia:", midia.url);
    
    if (midia.type === 'video') {
      this.modalVideo = midia.url;
      this.modalImage = null;
    } else {
      this.modalImage = midia.url;
      this.modalVideo = null;
    }
    document.getElementById("modal")!.style.display = "flex";
  }

  fecharModal() {
    console.log("Fechando modal");
    this.modalImage = null;
    this.modalVideo = null;
    document.getElementById("modal")!.style.display = "none";
  }
}
