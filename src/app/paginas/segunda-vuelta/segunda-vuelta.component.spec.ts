import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaVueltaComponent } from './segunda-vuelta.component';

describe('SegundaVueltaComponent', () => {
  let component: SegundaVueltaComponent;
  let fixture: ComponentFixture<SegundaVueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundaVueltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
