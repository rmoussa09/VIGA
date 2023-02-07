import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GachoicesComponent } from './gachoices.component';

describe('GachoicesComponent', () => {
  let component: GachoicesComponent;
  let fixture: ComponentFixture<GachoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GachoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GachoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
