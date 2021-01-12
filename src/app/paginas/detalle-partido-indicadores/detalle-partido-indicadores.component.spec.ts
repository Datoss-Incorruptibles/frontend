import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePartidoIndicadoresComponent } from './detalle-partido-indicadores.component';

describe('DetallePartidoIndicadoresComponent', () => {
  let component: DetallePartidoIndicadoresComponent;
  let fixture: ComponentFixture<DetallePartidoIndicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePartidoIndicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePartidoIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
