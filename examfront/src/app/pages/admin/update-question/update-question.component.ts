import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  
  quesId=0;
  question:any;

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _router:Router){}
  
  ngOnInit(): void {
    this.quesId= this._route.snapshot.params['quesid'];
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  //update form submit

  public updateQues(){
    //validate
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success!!",'question updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes'])
        });
      },
      (error)=>{
        Swal.fire('Error','error in upadting question','error');
        console.log(error);
        
      }
    ) 
  }
}
