import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  
  qId=0;

  quiz:any;
  categories:any;

  constructor(
  private _route:ActivatedRoute,
  private _quiz:QuizService,
  private _cat:CategoryService,
  private _router:Router,
  private _snack:MatSnackBar,
  ){}
  
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    //alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{

        alert("error in loading categories");
      }
    )
  }


  //update form submit
  public updateData(){
    //validate

    if(this.quiz.title.trim()==''|| this.quiz.title==null){

      this._snack.open('Title required!!','',{
        duration:3000,
      });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success!!','Quiz Updated Successfully!!','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error',"error in upadting quiz",'error');
        console.log(error);3
      }
    )
  }
}
