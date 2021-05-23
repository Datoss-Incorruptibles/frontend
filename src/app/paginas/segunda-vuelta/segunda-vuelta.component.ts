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
  public tabIndex = 0; //presidentes 

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
  mostrarCandidato_1 () {
    let cand_1 = document.querySelector("#candidato_1")
    let cand_2 = document.querySelector("#candidato_2")
    let img_1 = document.querySelector("#header-image_1")
    let img_2 = document.querySelector("#header-image_2")
    let aviso = document.querySelector(".aviso")

    if (cand_1.classList.contains("oculto")) {
      cand_1.classList.remove("oculto")
      cand_2.classList.add("oculto")

      img_1.classList.add("elegido")
      img_2.classList.remove("elegido")

      aviso.classList.add("oculto")
      
    }
  }
  mostrarCandidato_2 () {
    let cand_1 = document.querySelector("#candidato_1")
    let cand_2 = document.querySelector("#candidato_2")
    let img_1 = document.querySelector("#header-image_1")
    let img_2 = document.querySelector("#header-image_2")
    let aviso = document.querySelector(".aviso")

    if (cand_2.classList.contains("oculto")) {
      cand_2.classList.remove("oculto")
      cand_1.classList.add("oculto")

      img_2.classList.add("elegido")
      img_1.classList.remove("elegido")

      aviso.classList.add("oculto")
    }
  }

  setearTab(number){
     this.tabIndex = number; //presidentes 

  }
}
