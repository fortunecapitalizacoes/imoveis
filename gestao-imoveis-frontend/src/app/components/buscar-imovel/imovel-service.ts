import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from '../ImovelModel';


@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  private readonly API_URL = 'api/imoveis';

  constructor(private http: HttpClient) {}

  listarImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.API_URL);
  }

  buscarPorId(id: string): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.API_URL}/${id}`);
  }

  salvarImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.API_URL, imovel);
  }

  deletarImovel(id: string): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.API_URL}/deletar/${id}`);
  }

  uploadImagens(files: FileList): Observable<string[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    return this.http.post<string[]>(`${this.API_URL}/imagem/upload`, formData);
  }

  getImagem(id: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/imagem/${id}`, { responseType: 'blob' });
  }

  
}
