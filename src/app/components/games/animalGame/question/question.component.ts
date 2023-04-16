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
  quizStarted = false;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

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
}
