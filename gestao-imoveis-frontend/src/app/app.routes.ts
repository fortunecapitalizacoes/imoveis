import { Routes } from '@angular/router';
import { BuscarImovelComponent } from './components/buscar-imovel/buscar-imovel.component';
import { FormCadastroImovelComponent } from './components/form-cadastro-imovel/form-cadastro-imovel.component';
import { DetalhesImovelComponent } from './components/detalhes-imovel/detalhes-imovel.component';

export const routes: Routes = [
  { path: 'buscar-imovel', component: BuscarImovelComponent },
  { path: 'cadastro-imovel', component: FormCadastroImovelComponent },
  { path: 'detalhes-imovel', component: DetalhesImovelComponent },
  { path: '', redirectTo: 'buscar-imovel', pathMatch: 'full' }, // Redireciona para 'buscar-imovel' por padrão
  { path: '**', redirectTo: 'buscar-imovel' } // Redireciona qualquer rota inválida
];
