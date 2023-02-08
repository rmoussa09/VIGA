import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gameborder3Component } from './gameborder3.component';

describe('Gameborder3Component', () => {
  let component: Gameborder3Component;
  let fixture: ComponentFixture<Gameborder3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gameborder3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gameborder3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
