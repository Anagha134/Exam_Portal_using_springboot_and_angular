package com.exam.examserver.controller;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.service.QuestionService;
import com.exam.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    //update
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get all question
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> qetQuestionsOfQuiz(@PathVariable("qid") Long qid){
//        Quiz quiz=new Quiz();
//        quiz.setqId(qid);
//        Set<Question> questionOfQuiz= this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList(questions);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);

    }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> qetQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz=new Quiz();
        quiz.setqId(qid);
        Set<Question> questionOfQuiz= this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);

    }

    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }

    //delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){

        this.questionService.deleteQuestion(quesId);
    }
}
