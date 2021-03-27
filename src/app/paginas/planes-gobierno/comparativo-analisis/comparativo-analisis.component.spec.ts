import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativoAnalisisComponent } from './comparativo-analisis.component';

describe('ComparativoAnalisisComponent', () => {
  let component: ComparativoAnalisisComponent;
  let fixture: ComponentFixture<ComparativoAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativoAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
