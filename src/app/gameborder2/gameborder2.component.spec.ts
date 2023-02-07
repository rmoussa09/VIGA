import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gameborder2Component } from './gameborder2.component';

describe('Gameborder2Component', () => {
  let component: Gameborder2Component;
  let fixture: ComponentFixture<Gameborder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gameborder2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gameborder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
