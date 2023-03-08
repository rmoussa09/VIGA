import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaquestionComponent } from './gaquestion.component';

describe('GaquestionComponent', () => {
  let component: GaquestionComponent;
  let fixture: ComponentFixture<GaquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaquestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
