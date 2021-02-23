import { Component, OnInit } from '@angular/core';
import { GlobalService } from "src/app/servicios/global.service";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {
  public tabIndex = 0; //presidentes 

  
  constructor(private global:GlobalService,
    private title: Title,
    private meta: Meta) {

    this.global.tabIndexCurrent.subscribe(message =>this.tabIndex = message);


   }

  ngOnInit(): void {

      /* SEO Stuff */
      this.title.setTitle(`candidatos.pe`);
      let description = `Lista de todos los candidatos para las elecciones del 2021`
      this.meta.updateTag({name: "description", content:description});

  }

  setearTab(){
    this.global.tabIndexCandidatosSource.next(this.tabIndex);
    this.global.tabIndexPCSource.next(this.tabIndex + 1); // porque este tiene 4 tabs 

  }

}
