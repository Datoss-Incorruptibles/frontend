import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoSimerepresentaComponent } from './candidato-simerepresenta.component';

describe('CandidatoSimerepresentaComponent', () => {
  let component: CandidatoSimerepresentaComponent;
  let fixture: ComponentFixture<CandidatoSimerepresentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoSimerepresentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoSimerepresentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
