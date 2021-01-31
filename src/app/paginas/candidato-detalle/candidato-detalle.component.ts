import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from "src/app/servicios/restapi.service";
import { Location } from '@angular/common';
import { GlobalService } from "src/app/servicios/global.service";

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
    private global:GlobalService) { }

  ngOnInit(): void {
    this.getCandidato()

    
  }

  getCandidato(){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.restApi.getCandidato(id).subscribe(candidato => {
      this.candidato = candidato;
      this.showLoader = false;

      // console.log(this.candidato);
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
