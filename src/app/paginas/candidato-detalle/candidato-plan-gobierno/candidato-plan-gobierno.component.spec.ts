import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoPlanGobiernoComponent } from './candidato-plan-gobierno.component';

describe('CandidatoPlanGobiernoComponent', () => {
  let component: CandidatoPlanGobiernoComponent;
  let fixture: ComponentFixture<CandidatoPlanGobiernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoPlanGobiernoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoPlanGobiernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
