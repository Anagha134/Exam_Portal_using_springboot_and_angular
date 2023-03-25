import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  
  categories=[
    {
      cid:23,
      title:'Programming',
    },
    {
      cid:23,
      title:'Programming',
    },
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },

  }
  
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService){} 
  
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //categories will be loaded
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','error in loading data from server','error');
      }
    )
  }

  addQuiz(){
    if(this.quizData.title.trim()==''|| this.quizData.title==null){

      this._snack.open('Title required!!','',{
        duration:3000,
      });
      return;
    }

    if(this.quizData.category.cid==''|| this.quizData.category==null){
      this._snack.open('Category is required!!','',{
        duration:3000,
      });
      return;
    }
    if(this.quizData.maxMarks==''|| this.quizData.maxMarks==null){
      this._snack.open('Marks required !!','',{
        duration:3000,
      });
      return;
    }

    if(this.quizData.numberOfQuestions==''|| this.quizData.numberOfQuestions==null){
      this._snack.open('Number of questions is required!!','',{
        duration:3000,
      });
      return;
    }


    //validation

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','quiz is added','success')
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          },
      
        }
      },
      (error)=>{
        Swal.fire('Error!!','Error while adding quiz','error');
        console.log(error);
      }
    )

  }


}

