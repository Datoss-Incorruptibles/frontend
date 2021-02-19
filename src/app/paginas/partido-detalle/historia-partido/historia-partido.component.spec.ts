import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaPartidoComponent } from './historia-partido.component';

describe('HistoriaPartidoComponent', () => {
  let component: HistoriaPartidoComponent;
  let fixture: ComponentFixture<HistoriaPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaPartidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
