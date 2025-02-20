import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Imovel } from './ImovelModel';
@Injectable({
  providedIn: 'root'
})
export class ImovelObservableService {
  private imovelSource = new BehaviorSubject<Imovel | null>(null);
  imovel$ = this.imovelSource.asObservable();

  setImovel(imovel: any) {
    console.log(imovel)
    this.imovelSource.next(imovel);
  }
}