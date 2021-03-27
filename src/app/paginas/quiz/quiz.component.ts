import { Component, OnInit } from '@angular/core';
import { RestApiService } from "src/app/servicios/restapi.service";
import { ods } from './ods';
import { results } from './results';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  
  results = JSON.parse(JSON.stringify(results));

  step = "0";
  questionStep = 0;

  selectedOds = [];
  ods = JSON.parse(JSON.stringify(ods));

  minToStart = 0
  minToFinish = false;
  isLastQuestion = false;
  widthScreen = this.restApi.widthScreen;

  constructor(private restApi:RestApiService) {     
  }


  ngOnInit(): void {
  }

  nextQuestions(){
    // inicia las preguntas 
    if ( this.step == "0"){
      for (let i = 0; i < this.selectedOds.length; i++) {
        // this.questionStep = 0
        if (i == this.questionStep){
          this.selectedOds[i]["show"] = true;
        }else{
          this.selectedOds[i]["show"] = false;
        }
      }
      this.questionStep = 1;
      this.step = "1";

    }else if (this.step == "1"){
      // continua con las preguntas
      for (let i = 0; i < this.selectedOds.length; i++) {
        if (i == this.questionStep){
          this.selectedOds[i]["show"] = true;
          // console.log(this.selectedOds[i]["show"]);
        }else{
          this.selectedOds[i]["show"] = false;
          // console.log(this.selectedOds[i]["show"]);
        }
      }

      //  last question and go to results
      if ( this.questionStep  == this.selectedOds.length){
        this.isLastQuestion = true
        // get the objets selects of the  results of the array
        for (let l = 0; l < this.selectedOds.length; l++) {
          for (let m = 0; m < this.selectedOds[l].metas.length; m++) {
          // check if there are all least some check values = 
          // to get the results no 
            if (this.selectedOds[l].metas[m].selected == true) {
              this.minToFinish = true;
              for (let n = 0; n < this.selectedOds[l].metas[m].puntaje.length; n++) {
                // get all the results to map with the puntaje.id
                for (let a = 0; a < this.results.length; a++) {
                  if(this.results[a].id == this.selectedOds[l].metas[m].puntaje[n].id ){
                    // sum the selected questions to the results 
                    this.results[a].value = this.results[a].value + this.selectedOds[l].metas[m].puntaje[n].score;
                    // console.log("this.results[a].value");
                    
                  }         
                }
              }
            }
          }
        }
        
        if (this.minToFinish == false){
          // dont go to resultsz and avisar al usuario que necesita makar unos cheks 
          // console.log("you need to mark some checks");
          // this.step = "1"
          // this.questionStep = 1;
          this.questionStep = this.questionStep - 1;

        }else{
          // console.log("pasaste");
          this.step = "2"
          this.results.sort(function(a, b){return b.value - a.value});
        }
      // check si entro a last question
      }else{
        this.isLastQuestion = false;
        
      }
      // add one stepQ to the questions step =1
      this.questionStep = this.questionStep + 1;
      // this.results.sort(function(a, b){return b.value - a.value});

    }

    console.log(this.step,"this.step");
    console.log(this.questionStep,"this.questionStep");
    console.log(this.selectedOds,"this.selectedOds");
  } 

  backQuestions(){
    if ( this.step == "0"){
      //desativated 
    }else if (this.step == "1"){
      if (this.questionStep == 1){
        this.step = "0";
        this.questionStep = 0;
      }else{  
        //show only the questions necesary
        this.questionStep = this.questionStep - 1;
        for (let i = 0; i < this.selectedOds.length; i++) {
          // show the current questions
          if (i == this.questionStep -1 ){
            // console.log(this.selectedOds[i]);
            this.selectedOds[i]["show"] = true;
          }else {
            this.selectedOds[i]["show"] = false;
          }
        }
      }
      // no mostrar last texto de last questions
      this.isLastQuestion = false;
    }
    // no se muestara el boton de back
    // else if (this.step = "2"){
    //   this.step = "0";
    //   this.questionStep = 0;
    // }
    console.log(this.minToFinish,"this.minToFinish");
    console.log(this.step,"this.step");
    console.log(this.questionStep,"this.questionStep");
    console.log(this.selectedOds,"this.selectedOds");

  }

  selectOds(id){
    for (let i = 0; i < this.ods.length; i++) {
      if( this.ods[i].id == id ){
        if (this.ods[i].selected == true){
          this.ods[i].selected = false;
          this.minToStart = this.minToStart - 1;
          for (let j = 0; j < this.selectedOds.length; j++) {
            if (this.selectedOds[j].id == id) {
              this.selectedOds.splice(j, 1);
            }
          }
          console.log("remove",this.selectedOds);
        }else if(this.ods[i].selected == false){
          this.ods[i].selected = true;
          this.minToStart = this.minToStart + 1;
          this.selectedOds.push(this.ods[i])
          console.log("add",this.selectedOds);
        }
      }
    }
    console.log(this.minToStart,"this.minToStart");
    console.log(this.selectedOds,"this.selectedOds");
    console.log(this.ods,"this.ods");
  }

  startAgain(){
    this.results = JSON.parse(JSON.stringify(results));

    this.step = "0";
    this.questionStep = 0;
  
    this.selectedOds = [];
    this.ods = JSON.parse(JSON.stringify(ods));
  
    this.minToStart = 0
    this.minToFinish = false;
    this.isLastQuestion = false;

  }


  // setAll(e,metas){
  //   // revisar hay por lo menos si uno tiene el selected 
  //   // for (let i = 0; i < metas.length; i++) {
  //   //   if (metas[i].selected == true) {
  //   //    // one has true
  //   //     this.minToFinish = false
  //   //   }
  //   // }
  //   // if (e == true){
  //   //   this.minToNextQuestion = this.minToNextQuestion + 1;
  //   // }else if (e == false){
  //   //   this.minToNextQuestion = this.minToNextQuestion - 1;
  //   // }
  //   // console.log(e,data);
  //   // console.log(this.minToFinish,"this.minToFinish");
  // }

}
