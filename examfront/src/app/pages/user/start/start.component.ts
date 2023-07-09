import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit = false;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService){}
  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid =this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;

        this.questions.forEach( (q: any) => {
          q['givenAnswer'] = '';
        });

        console.log(data);
        
      },(error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions of quiz",'error');
        
      }
    )
  }

  // in order to prevent from going back 
  preventBackButton(){
    history.pushState(null, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, location.href);
    });
  }

  submitQuiz()
  {
    Swal.fire({
      title:'Do You want to submit the Quiz',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation
        this.isSubmit = true;
        
        this.questions.forEach((q:any) =>{
          if(q.givenAnswer == q.answer){
            this.correctAnswers++;
            let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
            this.marksGot += marksSingle;
          }

          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        });

        console.log("correct answers :" +this.correctAnswers);
        console.log("marks got :"+ this.marksGot);
        console.log("attempted :"+ this.attempted);
      }
    });
  }
}
