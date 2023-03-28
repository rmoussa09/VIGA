import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmainmenuComponent } from './spmainmenu.component';

describe('SpmainmenuComponent', () => {
  let component: SpmainmenuComponent;
  let fixture: ComponentFixture<SpmainmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpmainmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
