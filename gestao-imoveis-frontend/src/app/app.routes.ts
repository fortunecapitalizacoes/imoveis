import { Routes } from '@angular/router';
import { BuscarImovelComponent } from './components/buscar-imovel/buscar-imovel.component';
import { FormCadastroImovelComponent } from './components/form-cadastro-imovel/form-cadastro-imovel.component';
import { DetalhesImovelComponent } from './components/detalhes-imovel/detalhes-imovel.component';
import { FormCadastroPessoaComponent } from './components/form-cadastro-pessoa/form-cadastro-pessoa.component';
import { BuscarPessoaComponent } from './components/buscar-pessoa/buscar-pessoa.component';
import { EditarContratoComponent } from './components/editar-contrato/editar-contrato.component';

export const routes: Routes = [
  { path: 'buscar-imovel', component: BuscarImovelComponent },
  { path: 'buscar-pessoa', component: BuscarPessoaComponent },
  { path: 'cadastro-imovel', component: FormCadastroImovelComponent },
  { path: 'editar-contrato', component: EditarContratoComponent },
  { path: 'detalhes-imovel', component: DetalhesImovelComponent},
  { path: 'cadastro-pessoa', component: FormCadastroPessoaComponent},
  { path: '', redirectTo: 'buscar-imovel', pathMatch: 'full' }, // Redireciona para 'buscar-imovel' por padrão
  { path: '**', redirectTo: 'buscar-imovel' } // Redireciona qualquer rota inválida
];
