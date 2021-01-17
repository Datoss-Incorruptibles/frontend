import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoCongresistaComponent } from './candidato-congresista.component';

describe('CandidatoCongresistaComponent', () => {
  let component: CandidatoCongresistaComponent;
  let fixture: ComponentFixture<CandidatoCongresistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoCongresistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoCongresistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
