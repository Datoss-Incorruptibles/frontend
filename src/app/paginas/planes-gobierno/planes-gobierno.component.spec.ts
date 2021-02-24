import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesGobiernoComponent } from './planes-gobierno.component';

describe('PlanesGobiernoComponent', () => {
  let component: PlanesGobiernoComponent;
  let fixture: ComponentFixture<PlanesGobiernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesGobiernoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesGobiernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
