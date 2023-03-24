import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplevelComponent } from './splevel.component';

describe('SplevelComponent', () => {
  let component: SplevelComponent;
  let fixture: ComponentFixture<SplevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
