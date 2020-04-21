import { Component, OnInit } from '@angular/core';
import angielski from '../../assets/angielski.json';
import { trigger, state, style, transition, animate, query, animateChild, group, keyframes, sequence } from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('color', [



      state('timerStart', style({
        backgroundColor: '#90a4ae',
        height: '300px',
        marginTop: '0px',
        opacity: 1

      })),
      state('timerStop',
        style({
          //backgroundColor: '#66bb6a',
          backgroundColor: '#90a4ae',
          //transform: 'scaleY(0.1)',
          //transform: 'scaleY(-1)',
          height: '0px',
          marginTop: '300px',
          opacity: 0.1
        })),
      state('answerCorrect', style({
        backgroundColor: '#5dbb46',
        height: '300px',
        marginTop: '0px',
        opacity: 1

      })),
      state('answerWrong', style({
        backgroundColor: '#e63946',
        height: '300px',
        marginTop: '0px',
        opacity: 1

      })),

      //transition('timerStart => timerStop',animate('5000ms')),
      transition('timerStart => timerStop', [
        animate('5000ms')
      ]),
      //transition('timerStop => wrongAnswer',animate('5000ms')),
      transition('* => timerStart', animate('500ms')),
      transition('* => answerWrong', animate('100ms')),
      transition('* => answerCorrect', animate('100ms')),
      //transition('* => answerCorrect',animate('200ms'))
    ])
  ]
})

export class TestComponent implements OnInit {

  state: string = 'timerStart';
  userWord: string;
  questionWord: string;
  correctAnswer: string;
  sessionQuestionsCounter: number = 10;
  correctAnswerCounter: number;
  questionLanguage: string = "pl";
  answerLanguage: string = "en";

  constructor() {
    this.askQuestion();
  }

  ngOnInit() {
    //console.log(angielski.vocabulary[Math.round(Math.random() * angielski.vocabulary.length)])

  }

  askQuestion() {
    this.state = "timerStart"
    this.userWord = "";

    let index = Math.ceil(Math.random() * angielski.vocabulary.length - 1);
    console.log(index);
    console.log(angielski.vocabulary[index]);
    this.questionWord = angielski.vocabulary[index][this.questionLanguage];
    this.correctAnswer = angielski.vocabulary[index][this.answerLanguage];
    // this.state = 'timerStart'
  }

  checkQuestion() {
    // console.log("userWord " + this.userWord.toLowerCase());
    // console.log("correct " + this.correctAnswer);
    if (this.userWord.toLowerCase() === this.correctAnswer) {
      console.log("dobrze");
      setTimeout(() => { this.askQuestion(); }, 500);
      this.state = 'answerCorrect';
    }
    else {
      console.log("prawidlowa odpowiedz: " + this.correctAnswer);
      setTimeout(() => { this.askQuestion(); }, 500);
      this.state = 'answerWrong';
    }
  }

  isEnter(event) {
    if (event.keyCode == 13) {
      this.checkQuestion();
      //this.state = 'timerStop'
    }
  }

  onDone($event) {
    console.log($event)
    
    if ($event.toState === "timerStart"){
      console.log('sdsd')
      this.state = "timerStop"
    }

    if($event.fromState === "void")
      this.state = "timerStop"
    //if ($event.fromState === "timerStart")
    //  this.state = "answerWrong"

    if ($event.toState === "timerStop" && $event.phaseName === "done")
      this.checkQuestion();

    if ($event.toState === "answerWrong"){

    }
      //setTimeout(() => { this.askQuestion() }, 2000);

    //if ($event.toState === "timerStart")
    //  setTimeout(() => { this.askQuestion() }, 2000);

    
      

    
  }

  start() {
    this.state = "timerStart";
  }
  stop() {
    this.state = "timerStop";
  }
}
