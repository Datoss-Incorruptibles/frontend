import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoAndinoComponent } from './partido-andino.component';

describe('PartidoAndinoComponent', () => {
  let component: PartidoAndinoComponent;
  let fixture: ComponentFixture<PartidoAndinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidoAndinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoAndinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
