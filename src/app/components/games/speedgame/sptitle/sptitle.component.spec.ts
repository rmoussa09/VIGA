import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SptitleComponent } from './sptitle.component';

describe('SptitleComponent', () => {
  let component: SptitleComponent;
  let fixture: ComponentFixture<SptitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SptitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SptitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
