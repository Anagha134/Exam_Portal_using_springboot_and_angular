import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  
  qId:any;
  qtitle:any;
  question={
    quiz:{
      qId:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    console.log(this.qId);
    this.qtitle=this._route.snapshot.params['title'];
    this.question.quiz['qId']=this.qId;

  }

  formSubmit(){
    if(this.question.content.trim()==''||this.question.content == null){
      this._snack.open('Content Required!!!','',{
        duration:3000,
      })
      return;

    }

    if(this.question.option1.trim()==''||this.question.option1 == null){
      this._snack.open('Option1 Required!!!','',{
        duration:3000,
      })
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2 == null){
      this._snack.open('Option2 Required!!!','',{
        duration:3000,
      })
      return;
      
    }
    if(this.question.answer.trim()==''||this.question.answer == null){
      this._snack.open('Answer Required!!!','',{
        duration:3000,
      })
      return;
      
    }

    //submit the form
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success!!",'Question Added','success');
        this.question.content=''
        this.question.option1=''
        this.question.option2=''
        this.question.option3=''
        this.question.option4=''
        this.question.answer=''
      },
      (error)=>{
        Swal.fire("Error!!",'Error in adding question','error');
      }

    )
  }

}
