import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  //get the single question
  public getQuestion(quesid:any){
    return this.http.get(`${baseUrl}/question/${quesid}`);
  }

  //update question
  public updateQuestion(question:any){
    return this.http.put(`${baseUrl}/question/`,question)

  }

  //eval quiz
  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
  
}
