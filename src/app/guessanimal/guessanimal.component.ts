import { Component } from '@angular/core';

@Component({
  selector: 'app-guessanimal',
  templateUrl: './guessanimal.component.html',
  styleUrls: ['./guessanimal.component.scss']
})
export class GuessanimalComponent {
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

  // Start a new game
  constructor() {
    this.currentAnimal = this.getRandomAnimal();
    this.play();
  }

  // Play a round of the game
  private play(): void {
    console.log(`Guess the animal noise: ${this.animals[this.currentAnimal]}`);
    const userGuess = prompt(`What animal makes the following noise: "${this.animals[this.currentAnimal]}"?`);
    if (userGuess === this.currentAnimal) {
      console.log('Correct! Play again?');
      
      // Play the corresponding audio file
      const audio = new Audio(`${this.currentAnimal}.mp3`);
      audio.play();
      
      // Display the corresponding image file
      const image = document.createElement('img');
      image.src = `${this.animalImages[this.currentAnimal]}`;
      document.body.appendChild(image);
      this.currentAnimal = this.getRandomAnimal();
      this.play();
    } else {
      console.log(`Incorrect! The animal was "${this.currentAnimal}".`);
    }
  }

  // Pick a random animal from the list
  private getRandomAnimal(): string {
    const animalKeys = Object.keys(this.animals);
    return animalKeys[Math.floor(Math.random() * animalKeys.length)];
  }
}

// Start a new game
const game = new GuessanimalComponent();
