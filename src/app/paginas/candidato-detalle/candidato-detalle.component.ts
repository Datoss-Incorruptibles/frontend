import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from "src/app/servicios/restapi.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidato-detalle',
  templateUrl: './candidato-detalle.component.html',
  styleUrls: ['./candidato-detalle.component.scss']
})
export class CandidatoDetalleComponent implements OnInit {

  fromDetalle = true;
  candidato;
  constructor(private route: ActivatedRoute,private restApi:RestApiService,private location: Location) { }

  ngOnInit(): void {
    this.getCandidato()

    
  }

  getCandidato(){
    // get param id 
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.restApi.getCandidato(id).subscribe(candidato => {

      this.candidato = candidato
      console.log(this.candidato);

    })
  }


  goBack(): void {
    this.location.back();
  }

}
