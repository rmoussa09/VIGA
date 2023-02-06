import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessanimalComponent } from './guessanimal.component';

describe('GuessanimalComponent', () => {
  let component: GuessanimalComponent;
  let fixture: ComponentFixture<GuessanimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessanimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
