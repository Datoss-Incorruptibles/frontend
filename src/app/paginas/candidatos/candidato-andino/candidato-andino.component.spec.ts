import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoAndinoComponent } from './candidato-andino.component';

describe('CandidatoAndinoComponent', () => {
  let component: CandidatoAndinoComponent;
  let fixture: ComponentFixture<CandidatoAndinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoAndinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoAndinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
