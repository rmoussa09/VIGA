import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const defaultJSONPath = "assets/questions.json";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuestionJson(jsonPath: string = defaultJSONPath){
    return this.http.get<any>("assets/questions.json");
  }
}
