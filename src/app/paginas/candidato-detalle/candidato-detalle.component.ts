import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from "src/app/servicios/restapi.service";
import { Location } from '@angular/common';
import { GlobalService } from "src/app/servicios/global.service";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-candidato-detalle',
  templateUrl: './candidato-detalle.component.html',
  styleUrls: ['./candidato-detalle.component.scss']
})
export class CandidatoDetalleComponent implements OnInit {
  showLoader = false;

  fromDetalle = true;
  candidato;
  constructor(
    private route: ActivatedRoute,
    private restApi:RestApiService,
    private location: Location,
    private global:GlobalService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.getCandidato()
    // title

    // {{candidato.nombres}} {{candidato.apellido_paterno}} {{candidato.apellido_materno}}

    
  }

  getCandidato(){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.restApi.getCandidato(id).subscribe(candidato => {
      this.candidato = candidato;
      this.showLoader = false;
      // console.log(this.candidato);

      /* SEO Stuff */
      this.title.setTitle(`${this.candidato.nombres} ${this.candidato.apellido_paterno} ${this.candidato.apellido_materno}`);
      let description = `NOMBRES:${this.candidato.nombres} ${this.candidato.apellido_paterno} ${this.candidato.apellido_materno} DNI:${this.candidato.documento_identidad}`
      this.meta.updateTag({name: "description", content:description});

    })
  }


  goBack(): void {
    let index = 0;
    // console.log(this.candidato.cargo_id );
    if( this.candidato.cargo_id  == 1 || this.candidato.cargo_id  == 2 || this.candidato.cargo_id  == 3  ){
      index = 0;
      // console.log(index);
    }else if( this.candidato.cargo_id == 4){
      index = 1;
      // console.log(index);
    }else if( this.candidato.cargo_id == 5){
      index = 2;
      // console.log(index);
    }
    
    this.global.tabIndexCandidatosSource.next(index);
    this.global.tabIndexPCSource.next(index + 1); // porque este tiene 4 tabs 

    this.location.back();
  }

}
