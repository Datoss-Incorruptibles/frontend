import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoMediosComponent } from './candidato-medios.component';

describe('CandidatoMediosComponent', () => {
  let component: CandidatoMediosComponent;
  let fixture: ComponentFixture<CandidatoMediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoMediosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoMediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
