import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoVotarComponent } from './como-votar.component';

describe('ComoVotarComponent', () => {
  let component: ComoVotarComponent;
  let fixture: ComponentFixture<ComoVotarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComoVotarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoVotarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
