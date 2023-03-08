import { Component, ViewChild, ElementRef, AfterViewInit, Directive } from '@angular/core';

@Component({
  selector: 'app-guessanimal',
  templateUrl: './guessanimal.component.html',
  styleUrls: ['./guessanimal.component.scss']
})

export class GuessanimalComponent implements AfterViewInit {
  private animals: { [key: string]: string } = {
    dog: 'bark',
    cat: 'meow',
    cow: 'moo',
    horse: 'neigh',
    lion: 'roar',
    owl: 'hoot',
    duck: 'quack',
    frog: 'ribbit',
    wolf: 'howl',
    goose: 'honk',
    sheep: 'baa'
  };
  private animalImages: { [key: string]: string } = {
    dog: 'dog.jpg',
    cat: 'cat.jpg',
    cow: 'cow.jpg',
    horse: 'horse.jpg',
    lion: 'lion.jpg',
    owl: 'owl.jpg',
    duck: 'duck.jpg',
    frog: 'frog.jpg',
    wolf: 'wolf.jpg',
    goose: 'goose.jpg',
    sheep: 'sheep.jpg'
  };
  private currentAnimal: string;

  @ViewChild('gameContainer', { static: false })
  gameContainer!: ElementRef;

  // Start a new game
  constructor() {
    this.currentAnimal = this.getRandomAnimal();
  }

  ngAfterViewInit() {
    this.play();
  }

  // Play a round of the game
  private play(): void {
    console.log(`Guess the animal noise: ${this.animals[this.currentAnimal]}`);

    const options: string[] = [];
    for (const key of Object.keys(this.animals)) {
      options.push(key);
    }

    let correctOptionIndex = Math.floor(Math.random() * options.length);
    options.splice(correctOptionIndex, 1, this.currentAnimal);

    this.gameContainer.nativeElement.innerHTML = `
      <p>What animal makes the following noise: "${this.animals[this.currentAnimal]}"?</p>
      <p>
        Options:<br>
        1. ${options[0]}<br>
        2. ${options[1]}<br>
        3. ${options[2]}
      </p>
      <input type="text" id="userGuess" placeholder="Enter your guess here">
      <button id="submitButton">Submit</button>
    `;

    const submitButton = this.gameContainer.nativeElement.querySelector('#submitButton') as HTMLButtonElement;
    submitButton.addEventListener('click', () => {
      const userGuess = options[Number((this.gameContainer.nativeElement.querySelector('#userGuess') as HTMLInputElement).value) - 1];
      if (userGuess === this.currentAnimal) {
      alert('Correct! The animal noise was indeed made by a ' + userGuess + '.');
      this.currentAnimal = this.getRandomAnimal();
      this.play();
      } else {
      alert('Wrong! The animal noise was made by a ' + this.currentAnimal + '.');
      this.currentAnimal = this.getRandomAnimal();
      this.play();
      }
      });
      }
      
      private getRandomAnimal(): string {
      return Object.keys(this.animals)[Math.floor(Math.random() * Object.keys(this.animals).length)];
      }
      }
