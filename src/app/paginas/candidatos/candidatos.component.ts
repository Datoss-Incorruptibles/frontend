import { Component, OnInit } from '@angular/core';
import { GlobalService } from "src/app/servicios/global.service";

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  constructor(private global:GlobalService) {
    if(window.location.hash.includes("candidato")){
      this.global.messageSource.next("candidato")
    }

   }

  ngOnInit(): void {


  }

}
