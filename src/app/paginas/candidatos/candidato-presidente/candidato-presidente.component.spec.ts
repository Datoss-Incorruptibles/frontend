import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoPresidenteComponent } from './candidato-presidente.component';

describe('CandidatoPresidenteComponent', () => {
  let component: CandidatoPresidenteComponent;
  let fixture: ComponentFixture<CandidatoPresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoPresidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoPresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
