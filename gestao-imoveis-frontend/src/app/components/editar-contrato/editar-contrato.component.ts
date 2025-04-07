import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as mammoth from 'mammoth';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editar-contrato',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule],
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent {
  contratoForm: FormGroup;
  emptyModules = { toolbar: false }; // Toolbar removida

  constructor(private fb: FormBuilder) {
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
    mammoth.convertToHtml({ arrayBuffer }, { styleMap: [] }) // sem filtro no estilo
      .then(result => {
        const htmlContent = result.value;
        this.contratoForm.patchValue({ editor: htmlContent });
      })
      .catch(err => console.error('Erro ao converter DOCX:', err));
  }

  exportDocx() {
    console.log('Salvar como DOCX ainda precisa ser implementado.');
  }
}
