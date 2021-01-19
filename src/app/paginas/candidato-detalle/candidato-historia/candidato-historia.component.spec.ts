import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoHistoriaComponent } from './candidato-historia.component';

describe('CandidatoHistoriaComponent', () => {
  let component: CandidatoHistoriaComponent;
  let fixture: ComponentFixture<CandidatoHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
