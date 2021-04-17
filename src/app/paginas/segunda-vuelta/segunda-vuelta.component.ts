import { Component, OnInit } from '@angular/core';
import { RestApiService } from "src/app/servicios/restapi.service";

@Component({
  selector: 'app-segunda-vuelta',
  templateUrl: './segunda-vuelta.component.html',
  styleUrls: ['./segunda-vuelta.component.scss']
})
export class SegundaVueltaComponent implements OnInit {
  showLoader = false;
  candidato_1;
  candidato_2;

  constructor(
    private restApi:RestApiService
  ) { }

  ngOnInit(): void {
    this.getCandidato()
  }

  getCandidato(){
    // get param id 
    this.showLoader = true;

    //const id = +this.route.snapshot.paramMap.get('id');
    const id_1 = 133878
    this.restApi.getCandidato(id_1).subscribe(candidato => {
      this.candidato_1 = candidato;
      this.showLoader = false;
    })

    const id_2 = 137792
    this.restApi.getCandidato(id_2).subscribe(candidato => {
      this.candidato_2 = candidato;
      this.showLoader = false;
    })
  }
}
