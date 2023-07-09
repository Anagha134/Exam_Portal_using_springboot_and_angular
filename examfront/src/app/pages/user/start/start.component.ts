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

  timer:any;

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
        // each question will have 2 minutes to solve and multiple by 60 sec
        // timer contains times in seconds.
        this.timer=this.questions.length* 2 * 60;


        this.questions.forEach( (q: any) => {
          q['givenAnswer'] = '';
        });

        console.log(data);
        this.startTimer();
        
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
        this.evalQuiz();
      }
    });
  }


  startTimer(){
    // there is function in windows object that take two parameters
    // one is callback func and second is time in millisecond -- after the time is completed it calls the callback func

    let t = window.setInterval(()=>{
      //code -- gets call after 1 sec.
      if(this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
        // clear interval will clear the rest of the things 
      }else{
        this.timer--;
      }

    },1000)
  }


  getFormattedTime(){
    let min = Math.floor(this.timer/60);
    let ss=this.timer-min*60;
    return `${min} min : ${ss} sec`;
  }


  evalQuiz(){
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
}
