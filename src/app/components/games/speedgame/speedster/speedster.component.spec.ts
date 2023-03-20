import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedsterComponent } from './speedster.component';

describe('SpeedsterComponent', () => {
  let component: SpeedsterComponent;
  let fixture: ComponentFixture<SpeedsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
