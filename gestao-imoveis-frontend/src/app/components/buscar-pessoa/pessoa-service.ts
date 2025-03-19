import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly API_URL_V2 = '/cadastro/pessoa/pessoa';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL_V2);
  }
 
  deletarImovel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL_V2}/${id}`);
  }

 
}
