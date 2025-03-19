import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPessoaComponent } from './buscar-pessoa.component';

describe('BuscarPessoaComponent', () => {
  let component: BuscarPessoaComponent;
  let fixture: ComponentFixture<BuscarPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
