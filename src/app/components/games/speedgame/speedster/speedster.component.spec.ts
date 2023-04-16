import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeedsterComponent, Command } from './speedster.component';

describe('SpeedsterComponent', () => {
  let component: SpeedsterComponent;
  let fixture: ComponentFixture<SpeedsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeedsterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.gameStarted).toBeFalse();
    expect(component.gameOver).toBeFalse();
    expect(component.levelCompleted).toBeFalse();
    expect(component.level).toBe(1);
    expect(component.score).toBe(0);
    expect(component.displayLevelSelect).toBeFalse();
    expect(component.currentLevel).toBe(1);
    expect(component.levelSelectedVisible).toBeFalse();
    expect(component.mainMenuVisible).toBeFalse();
  });

  it('should handle keydown events and check commands', () => {
    component.gameStarted = true;
    component.gameOver = false;
    component.currentCommand = Command.UP;
    const keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    spyOn(component, 'checkCommand');
    document.dispatchEvent(keyEvent);
    expect(component.checkCommand).toHaveBeenCalledWith(Command.UP);
  });

  it('should start the game and handle level selection', () => {
    component.startGame();
    expect(component.gameStarted).toBeFalse();
    expect(component.level).toBe(1);
    component.displayLevelSelectScreen();
    expect(component.displayLevelSelect).toBeTrue();
  });

  it('should handle endless mode functionality', () => {
    component.startEndlessMode();
    expect(component.gameStarted).toBeTrue();
    expect(component.gameOver).toBeFalse();
    expect(component.currentLevel).toBe(-1);
  });

  it('should handle level mode functionality', () => {
    component.enterLevelMode();
    expect(component.gameStarted).toBeFalse();
    expect(component.displayLevelSelect).toBeTrue();
    component.levelSelected(3);
    expect(component.currentLevel).toBe(3);
  });

  it('should handle game over and level completion scenarios', () => {
    component.startLevel();
    component.endGame();
    expect(component.gameOver).toBeTrue();
    expect(component.levelCompleted).toBeFalse();
    component.nextLevel();
    expect(component.currentLevel).toBe(2);
  });
});
