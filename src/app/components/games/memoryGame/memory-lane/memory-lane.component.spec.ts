import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryLAneComponent } from './memory-lane.component';

describe('MemoryLAneComponent', () => {
  let component: MemoryLAneComponent;
  let fixture: ComponentFixture<MemoryLAneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryLAneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryLAneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
