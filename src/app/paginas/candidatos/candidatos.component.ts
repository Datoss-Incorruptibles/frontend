import { Component, OnInit } from '@angular/core';
import { GlobalService } from "src/app/servicios/global.service";

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {
  public tabIndex = 0; //presidentes 

  
  constructor(private global:GlobalService) {
    if(window.location.hash.includes("candidato")){
      this.global.messageSource.next("candidato")
    }

    this.global.tabIndexCurrent.subscribe(message =>this.tabIndex = message);


   }

  ngOnInit(): void {


  }

  setearTab(){
    this.global.tabIndexCandidatosSource.next(this.tabIndex);
    this.global.tabIndexPCSource.next(this.tabIndex + 1); // porque este tiene 4 tabs 

  }

}
