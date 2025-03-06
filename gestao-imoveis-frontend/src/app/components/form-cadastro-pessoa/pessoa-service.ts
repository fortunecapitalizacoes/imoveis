import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from '../ImovelModel';



@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly API_URL_V2 = 'api-v2/pessoa';

  constructor(private http: HttpClient) {}

  listarImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.API_URL_V2);
  }

  buscarPorId(id: string): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.API_URL_V2}/${id}`);
  }

  salvarPessoa(pessoa: any): Observable<any> {
    return this.http.post<any>(this.API_URL_V2, pessoa);
  }

  deletarImovel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL_V2}/${id}`);
  }

  uploadImagens(files: FileList): Observable<string[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    return this.http.post<string[]>(`${this.API_URL_V2}/imagem/upload`, formData);
  }

  

  
  deleteFile(id: string): Observable<Blob> {
    return this.http.delete(`${this.API_URL_V2}/imagem/delete/${id}`, { responseType: 'blob' });
  }

  getImagem(id: string): Observable<Blob> {
    return this.http.get(`${this.API_URL_V2}/imagem/${id}`, { responseType: 'blob' });
  }
}
