import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImovelService } from './imovel-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-cadastro-imovel',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  standalone: true,
  providers: [ImovelService],
  templateUrl: './form-cadastro-imovel.component.html',
  styleUrls: ['./form-cadastro-imovel.component.css']
})
export class FormCadastroImovelComponent implements AfterViewInit {
  cadastroForm: FormGroup;
  imagePreviews: string[] = [];
  videoPreviews: string[] = [];
  selectedImages: string[] = [];
  selectedVideos: string[] = [];
  fileListImagem: any;
  fileListVideo: any;

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
      imagens: this.fb.array([[]]),
      videos: [[]]
    });
  }

  private setupDropZone(dropZoneId: string, inputId: string) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(inputId) as HTMLInputElement;

    if (dropZone && fileInput) {
      this.addDropZoneEventListeners(dropZone, fileInput, inputId);
    } else {
      console.warn(`DropZone (${dropZoneId}) ou Input (${inputId}) não encontrado!`);
    }
  }

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

  private handleFiles(inputId: string, files: FileList) {
    this.showPreview(inputId, files);
    this.uploadFiles(inputId, files);
  }

  private handleDropFiles(fileInput: HTMLInputElement, files: FileList) {
    const dataTransfer = new DataTransfer();
    Array.from(files).forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    this.handleFiles(fileInput.id, fileInput.files);
  }

  private showPreview(inputId: string, files: FileList) {
    const previewContainerId = inputId === 'imagens' ? 'previewImagens' : 'previewVideos';
    const previewContainer = document.getElementById(previewContainerId);

    if (previewContainer) {
      previewContainer.innerHTML = '';

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          let element;
          if (inputId === 'imagens') {
            element = document.createElement('img');
            element.src = e.target?.result as string;
            element.style.width = '100px';
            element.style.height = '100px';
            element.style.margin = '5px';
            element.style.objectFit = 'cover';
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

  private uploadImagens(files: FileList): Observable<string[]> {
    return this.imovelService.uploadImagens(files);
  }

  private uploadVideos(files: FileList): Observable<string[]> {
    return this.imovelService.uploadImagens(files);
  }

  ngAfterViewInit() {
    this.setupDropZone('dropZoneImages', 'imagens');
    this.setupDropZone('dropZoneVideos', 'videos');
  }

  onSubmit() {
    if (this.cadastroForm.valid) {


     
        this.uploadFiles("imagens",this.fileListImagem)
     //   this.uploadFiles("videos",this.fileListVideo)

        console.log()
    
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

  triggerFileInput(type: string): void {
    const inputElement = document.getElementById(type) as HTMLInputElement;
    inputElement?.click();
  }

  onFilesSelected(event: any, type: string): void {
    const files: FileList = event.target.files;
    
    if (!files || files.length === 0) return;
 //   this.uploadFiles(type, files);

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result != null) {
          if (type === 'imagens') {
            this.selectedImages.push(result as string);
            this.fileListImagem = event.target.files;
          } else if (type === 'videos') {
            this.selectedVideos.push(result as string);
            this.fileListVideo = event.target.files;
          }
        }
      };
      reader.readAsDataURL(file);
    });

    console.log(this.selectedImages);
  }

  removeFile(index: number, type: string): void {
    if (type === 'imagens') {
      this.selectedImages.splice(index, 1);
      console.log("this.selectedImages  ", this.selectedImages );
  
      // Garantir que fileListImagem seja um array e então usar splice
      if (!Array.isArray(this.fileListImagem)) {
        this.fileListImagem = Array.from(this.fileListImagem); // Convertendo para array se necessário
      }
      
      this.fileListImagem.splice(index, 1);
      console.log("this.fileListImagem  ", this.fileListImagem);
    } else if (type === 'videos') {
      this.selectedVideos.splice(index, 1);
    }
  }
  
  
}
