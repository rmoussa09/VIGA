import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gameborder1Component } from './gameborder1.component';

describe('Gameborder1Component', () => {
  let component: Gameborder1Component;
  let fixture: ComponentFixture<Gameborder1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gameborder1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gameborder1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
