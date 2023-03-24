import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplevelpageComponent } from './splevelpage.component';

describe('SplevelpageComponent', () => {
  let component: SplevelpageComponent;
  let fixture: ComponentFixture<SplevelpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplevelpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplevelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
