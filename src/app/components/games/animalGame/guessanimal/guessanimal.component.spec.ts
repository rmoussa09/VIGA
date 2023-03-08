import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessanimalComponent } from './guessanimal.component';

describe('GuessAnimalComponent', () => {
  let component: GuessanimalComponent;
  let fixture: ComponentFixture<GuessanimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessanimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});