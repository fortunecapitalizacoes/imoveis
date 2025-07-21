import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as mammoth from 'mammoth';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { ContratoService } from './contrato-service';
@Component({
  selector: 'app-editar-contrato',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, HttpClientModule],
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css'],
  providers: [ContratoService]
})
export class EditarContratoComponent {
  contratoForm: FormGroup;
  emptyModules = { toolbar: false };

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService
  ) {
    this.contratoForm = this.fb.group({
      editor: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        this.convertDocxToHtml(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  private convertDocxToHtml(arrayBuffer: ArrayBuffer) {
    mammoth.convertToHtml({ arrayBuffer }, { styleMap: [] })
      .then(result => {
        const htmlContent = result.value;
        this.contratoForm.patchValue({ editor: htmlContent });
      })
      .catch(err => console.error('Erro ao converter DOCX:', err));
  }

  salvartDocx() {
    const htmlContent = this.contratoForm.get('editor')?.value;

    this.contratoService.gerarDocx(htmlContent).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'contrato.docx';
        link.click();
        URL.revokeObjectURL(link.href);
      },
      error: (err) => {
        console.error('Erro ao salvar DOCX:', err);
      }
    });
  }
}
