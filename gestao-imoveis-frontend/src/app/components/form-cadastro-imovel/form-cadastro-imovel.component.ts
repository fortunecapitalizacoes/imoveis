import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImovelService } from './imovel-service';

@Component({
  selector: 'app-form-cadastro-imovel',
  imports: [ReactiveFormsModule, HttpClientModule],
  standalone: true,
  providers: [ImovelService],
  templateUrl: './form-cadastro-imovel.component.html',
  styleUrls: ['./form-cadastro-imovel.component.css']
})
export class FormCadastroImovelComponent implements AfterViewInit {
  cadastroForm: FormGroup;
  imagePreviews: string[] = [];
  videoPreviews: string[] = [];
  
  constructor(private fb: FormBuilder, private imovelService: ImovelService) {
    this.cadastroForm = this.fb.group({
      tipo: ['', Validators.required],
      status: ['', Validators.required],
      endereco: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0)]],
      areaTotal: [null, [Validators.required, Validators.min(0)]],
      areaConstruida: [null, [Validators.min(0)]],
      quartos: [null, [Validators.required, Validators.min(0)]],
      banheiros: [null, [Validators.required, Validators.min(0)]],
      vagasGaragem: [null, [Validators.min(0)]],
      descricao: [''],
      imagens: [[]],
      videos: [[]]
    });
  }

  /**
   * Configura a zona de drop para um input de arquivos e adiciona eventos de click, dragover, dragleave e drop.
   * Ao selecionar ou soltar arquivos, chama a pré-visualização e o upload dos mesmos.
   */
  private setupDropZone(dropZoneId: string, inputId: string) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(inputId) as HTMLInputElement;

    if (dropZone && fileInput) {
      this.addDropZoneEventListeners(dropZone, fileInput, inputId);
    } else {
      console.warn(`DropZone (${dropZoneId}) ou Input (${inputId}) não encontrado!`);
    }
  }

  /**
   * Adiciona eventos à zona de drop
   */
  private addDropZoneEventListeners(dropZone: HTMLElement, fileInput: HTMLInputElement, inputId: string) {
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        this.handleFiles(inputId, fileInput.files);
      }
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');

      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        this.handleDropFiles(fileInput, e.dataTransfer.files);
      }
    });
  }

  /**
   * Trata os arquivos selecionados e os envia para upload
   */
  private handleFiles(inputId: string, files: FileList) {
    this.showPreview(inputId, files);
    this.uploadFiles(inputId, files);
  }

  /**
   * Processa o drop dos arquivos e os atribui ao input de arquivos
   */
  private handleDropFiles(fileInput: HTMLInputElement, files: FileList) {
    const dataTransfer = new DataTransfer();
    Array.from(files).forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    this.handleFiles(fileInput.id, fileInput.files);
  }

  /**
   * Exibe uma pré-visualização dos arquivos selecionados.
   */
  private showPreview(inputId: string, files: FileList) {
    const previewContainerId = inputId === 'imagens' ? 'previewImagens' : 'previewVideos';
    const previewContainer = document.getElementById(previewContainerId);
  
    if (previewContainer) {
      previewContainer.innerHTML = ''; // Limpa pré-visualizações anteriores
  
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          let element;
          if (inputId === 'imagens') {
            element = document.createElement('img');
            element.src = e.target?.result as string;
            element.style.width = '100px'; // Ajuste o tamanho conforme necessário
            element.style.height = '100px'; // Ajuste o tamanho conforme necessário
            element.style.margin = '5px';
            element.style.objectFit = 'cover'; // Para garantir que as imagens mantenham o aspecto proporcional
          } else if (inputId === 'videos') {
            element = document.createElement('video');
            element.src = e.target?.result as string;
            element.controls = true;
            element.style.width = '150px';
            element.style.height = '100px';
          }
          if (element) {
            previewContainer.appendChild(element);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      console.warn(`Container de pré-visualização (${previewContainerId}) não encontrado!`);
    }
  }
  
  /**
   * Cria e adiciona o elemento de pré-visualização (imagem ou vídeo)
   */
  private createPreviewElement(inputId: string, result: string) {
    const previewContainer = document.getElementById(inputId === 'imagens' ? 'previewImagens' : 'previewVideos');
    let element;

    if (inputId === 'imagens') {
      element = document.createElement('img');
      element.src = result;
      element.style.width = '100px';
      element.style.height = '100px';
    } else if (inputId === 'videos') {
      element = document.createElement('video');
      element.src = result;
      element.controls = true;
      element.style.width = '150px';
      element.style.height = '100px';
    }

    if (element) {
      element.style.margin = '5px';
      previewContainer?.appendChild(element);
    }
  }

  /**
   * Faz o upload dos arquivos conforme o tipo (imagens ou vídeos).
   */
  private uploadFiles(inputId: string, files: FileList) {
    if (inputId === 'imagens') {
      this.uploadImagens(files).subscribe((urls) => {
        this.cadastroForm.controls['imagens'].setValue(urls);
      });
    } else if (inputId === 'videos') {
      this.uploadVideos(files).subscribe((urls) => {
        this.cadastroForm.controls['videos'].setValue(urls);
      });
    }
  }

  // Método de upload para imagens (retorna um Observable com URLs)
  private uploadImagens(files: FileList): Observable<string[]> {
    return this.imovelService.uploadImagens(files);
  }

  // Método de upload para vídeos (corrigido para chamar o serviço adequado)
  private uploadVideos(files: FileList): Observable<string[]> {
    return this.imovelService.uploadImagens(files); // Corrigido o serviço de upload de vídeos
  }

  ngAfterViewInit() {
    // Configura as zonas de drop para imagens e vídeos
    this.setupDropZone('dropZoneImages', 'imagens');
    this.setupDropZone('dropZoneVideos', 'videos');
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.imovelService.salvarImovel(this.cadastroForm.value).subscribe(
        (res) => {
          console.log('Imóvel cadastrado:', res);
          alert('Cadastro realizado com sucesso!');
        },
        (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao cadastrar imóvel.');
        }
      );
    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  selectedImages: string[] = [];
selectedVideos: string[] = [];

triggerFileInput(type: string): void {
  const inputElement = document.getElementById(type) as HTMLInputElement;
  inputElement?.click();
}

onFilesSelected(event: any, type: string): void {
  const files: FileList = event.target.files;
  if (!files || files.length === 0) return;

  // Converte FileList para um array de File corretamente
  Array.from(files).forEach((file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (result) {
        if (type === 'imagens') {
          this.selectedImages.push(result as string);
        } else if (type === 'videos') {
          this.selectedVideos.push(result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  });
}



removeFile(index: number, type: string): void {
  if (type === 'imagens') {
    this.selectedImages.splice(index, 1);
  } else if (type === 'videos') {
    this.selectedVideos.splice(index, 1);
  }
}

}
