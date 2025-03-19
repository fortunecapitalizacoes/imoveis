import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormCadastroImovelComponent } from './components/form-cadastro-imovel/form-cadastro-imovel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscarImovelComponent } from './components/buscar-imovel/buscar-imovel.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormCadastroPessoaComponent } from './components/form-cadastro-pessoa/form-cadastro-pessoa.component';

@Component({
    selector: 'app-root',
    standalone: true,  // Marca o componente como standalone

    imports: [RouterOutlet, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestao-imoveis-frontend';
}
