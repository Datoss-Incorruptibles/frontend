import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPresidenteComponent } from './listado-presidente.component';

describe('ListadoPresidenteComponent', () => {
  let component: ListadoPresidenteComponent;
  let fixture: ComponentFixture<ListadoPresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPresidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
