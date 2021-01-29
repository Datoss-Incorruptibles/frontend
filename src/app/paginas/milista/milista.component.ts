import { Component, OnInit } from '@angular/core';
import { RestApiService } from "src/app/servicios/restapi.service";

@Component({
  selector: 'app-milista',
  templateUrl: './milista.component.html',
  styleUrls: ['./milista.component.scss']
})
export class MilistaComponent implements OnInit {


  misRepresentantes :any= [];
  misNoRepresentantes :any= [];
  showLoader;
  constructor(private restApi:RestApiService) { }

  ngOnInit(): void {
    // get id from local storage
    this.getMisCandidatos();

  }

  getMisCandidatos(){
    let ids  = localStorage.getItem('ids');
    let idsObj:any = JSON.parse(ids);
    // console.log(idsObj);
    
    if( idsObj && idsObj["noMeRepresenta"].length > 0){
      for (let i = 0; i < idsObj["noMeRepresenta"].length; i++) {
        // console.log(idsObj["noMeRepresenta"][i]);
        this.getMisNoCandidatos(idsObj["noMeRepresenta"][i])
      }
    }
    if( idsObj && idsObj["meRepresenta"].length > 0){
      for (let i = 0; i < idsObj["meRepresenta"].length; i++) {
        // console.log(idsObj["meRepresenta"][i]);
        this.getMisCandidato(idsObj["meRepresenta"][i])
      }
    }
  }

  getMisCandidato(id){
    this.restApi.getCandidato(id).subscribe((candidato :any)=> {
      this.misRepresentantes.push(candidato)
    })
  }

  getMisNoCandidatos(id){
    this.restApi.getCandidato(id).subscribe((candidato :any)=> {
      this.misNoRepresentantes.push(candidato)
    })
  }

  onScroll(){
    // console.log("mi lista scrool");
    
  }

}
