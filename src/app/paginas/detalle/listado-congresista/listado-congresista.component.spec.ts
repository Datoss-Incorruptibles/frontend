import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCongresistaComponent } from './listado-congresista.component';

describe('ListadoCongresistaComponent', () => {
  let component: ListadoCongresistaComponent;
  let fixture: ComponentFixture<ListadoCongresistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCongresistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCongresistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
