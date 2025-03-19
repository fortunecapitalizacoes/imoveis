import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from './pessoa-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-cadastro-pessoa',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
   providers: [PessoaService],
  templateUrl: './form-cadastro-pessoa.component.html',
  styleUrl: './form-cadastro-pessoa.component.css'
})
export class FormCadastroPessoaComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private pessoaService: PessoaService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // formato de CPF
      documentoDeIdentificacao: this.fb.group({
        tipo: ['', Validators.required],
        numero: ['', Validators.required],
        dataEmissao: ['', Validators.required],
        orgaoEmissor: ['', Validators.required],
        estadoEmissor: ['', Validators.required],
        dataValidade: [''] // Pode ser opcional
      }),
      mae: ['', Validators.required],
      pai: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]], // formato de CEP
        pais: ['', Validators.required]
      }),
      profissao: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }

  onSubmit() {
    if (true) {
      console.log(this.cadastroForm.value);


      this.pessoaService.salvarPessoa(this.cadastroForm.value).subscribe(
        (res) => {
          console.log('Imóvel cadastrado:', res);
          alert('Cadastro realizado com sucesso!');
        },
        (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao cadastrar imóvel.');
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
