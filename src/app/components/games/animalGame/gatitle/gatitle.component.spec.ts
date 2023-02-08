import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GATitleComponent } from './gatitle.component';

describe('GATitleComponent', () => {
  let component: GATitleComponent;
  let fixture: ComponentFixture<GATitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GATitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GATitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
