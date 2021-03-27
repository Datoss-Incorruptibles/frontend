import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelPropuestasComponent } from './nivel-propuestas.component';

describe('NivelPropuestasComponent', () => {
  let component: NivelPropuestasComponent;
  let fixture: ComponentFixture<NivelPropuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelPropuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelPropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
