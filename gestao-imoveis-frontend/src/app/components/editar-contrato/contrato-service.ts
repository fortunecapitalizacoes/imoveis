import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Document, Packer, Paragraph } from 'docx';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = '/contrato/contrato';
  constructor(private http: HttpClient) {}

  gerarDocx(htmlContent: string): Observable<Blob> {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                // aqui você pode usar lógica para transformar o htmlContent em texto
                // ou parsear com uma lib (exemplo básico abaixo)
                new Paragraph(htmlContent)
              ]
            })
          ]
        }
      ]
    });

    return from(Packer.toBlob(doc)).pipe(
      switchMap(blob => {
        const file = new File(
          [blob],
          'contrato.docx',
          { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        );

        const formData = new FormData();
        formData.append('file', file); // agora sim é um .docx válido

        return this.http.post(this.apiUrl + "/processarContrato", formData, {
          responseType: 'blob'
        });
      })
    );
  }
}
