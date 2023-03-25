import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  
  qId:any;
  qtitle:any;
  questions=[
    {

      answer:21,
      content : 'programming',
      image:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      quesId:'',
      quiz:{
        qId:'',
        
      }
    },
  ];
  
  constructor(private _route:ActivatedRoute,private _question:QuestionService){}
  
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
       this.questions = data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
    
  }

}
