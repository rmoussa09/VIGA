import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MltitleComponent } from './mltitle.component';

describe('MltitleComponent', () => {
  let component: MltitleComponent;
  let fixture: ComponentFixture<MltitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MltitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MltitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
