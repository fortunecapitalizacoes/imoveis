import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarImovelComponent } from './buscar-imovel.component';

describe('BuscarImovelComponent', () => {
  let component: BuscarImovelComponent;
  let fixture: ComponentFixture<BuscarImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
