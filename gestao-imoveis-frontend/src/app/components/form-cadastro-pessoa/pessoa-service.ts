import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly API_URL_V2 = '/cadastro/pessoa/pessoa';

  constructor(private http: HttpClient) {}

  salvarPessoa(pessoa: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.API_URL_V2}/salvar`, pessoa);
  }
}
