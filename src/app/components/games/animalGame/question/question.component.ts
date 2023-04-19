import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss',
              './../../../../../assets/bootstrap.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "hello";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  chosenOption: any;
  quizStarted = false;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  animalAudio: any;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
  }

  startQuiz() {
    this.quizStarted = true;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe(res => {
      // Randomize the order of the questions
      this.questionList = this.shuffleArray(res.questions);

      // Randomize the order of the options for each question
      this.questionList.forEach((question: any) => {
        question.options = this.shuffleArray(question.options);
      });

      // Limit to 10 questions
      this.questionList = this.questionList.slice(0, 10);
    });
  }

  shuffleArray(array: any[]) {
    // Implement Fisher-Yates shuffle algorithm to randomize the array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    if(currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
    }
    if (option.correct) {
      this.points += 1;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.getProgressPercent();
      }, 1000);

      this.points -= 1;
    }
  }

  resetQuiz() {
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
    this.quizStarted = false;
    this.isQuizCompleted = false;
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }
  
// Playing designated audio for Question sound, Animal sound , and Animal names of option choices
  playSound(){
    let audio = new Audio();
    audio.src = "../assets/What_animal_makes_this_noise.wav"
    audio.load();
    audio.play();
  }

  play_Sound(){
    let audio = new Audio();
    audio.src = this.questionList[this.currentQuestion].soundAudio;
    audio.load();
    audio.play();
  }

  playAudio(optionIndex: number) {
    let audio = new Audio();
    audio.src = this.questionList[this.currentQuestion].options[optionIndex].textAudio;
    audio.load();
    audio.play();
  }

}