import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCandidatoComponent } from './card-candidato.component';

describe('CardCandidatoComponent', () => {
  let component: CardCandidatoComponent;
  let fixture: ComponentFixture<CardCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
