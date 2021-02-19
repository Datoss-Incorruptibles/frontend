import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoPlanGobiernoComponent } from './partido-plan-gobierno.component';

describe('PartidoPlanGobiernoComponent', () => {
  let component: PartidoPlanGobiernoComponent;
  let fixture: ComponentFixture<PartidoPlanGobiernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidoPlanGobiernoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoPlanGobiernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
