import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroPessoaComponent } from './form-cadastro-pessoa.component';

describe('FormCadastroPessoaComponent', () => {
  let component: FormCadastroPessoaComponent;
  let fixture: ComponentFixture<FormCadastroPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroPessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
