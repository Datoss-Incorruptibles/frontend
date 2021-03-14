import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoNomepresentaComponent } from './candidato-nomepresenta.component';

describe('CandidatoNomepresentaComponent', () => {
  let component: CandidatoNomepresentaComponent;
  let fixture: ComponentFixture<CandidatoNomepresentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoNomepresentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoNomepresentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
