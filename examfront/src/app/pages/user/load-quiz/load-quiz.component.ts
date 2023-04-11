import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}
  
  ngOnInit(): void {
    
    
    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];
      if(this.catId == 0){
        this._quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            alert("error in loading al quizzes");
            
          })
        
        console.log("load all the quiz");
        
      }else{
        console.log("load specific quiz");
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
            // console.log(this.quizzes);
            
          },
          (error)=>{
            alert("error in loading quiz data");
          }
        )
      }
      
    })
    
    
  }

}
