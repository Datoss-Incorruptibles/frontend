import { Component, OnInit } from '@angular/core';
import { GlobalService } from "src/app/servicios/global.service";
import { RestApiService } from "src/app/servicios/restapi.service";

@Component({
  selector: 'app-milista',
  templateUrl: './milista.component.html',
  styleUrls: ['./milista.component.scss']
})
export class MilistaComponent implements OnInit {


  misRepresentantes :any= [];
  misNoRepresentantes :any= [];
  chunksSMIds = [];
  chunksNMIds = [];
  idsObj = {};
  showLoader;
  counterNMR = 0;
  counterSMR = 0;

  constructor(private restApi:RestApiService,
    private global:GlobalService) { 
  }

  ngOnInit(): void {
    // get id from local storage
    this.getChunks();
    this.getMisCandidatosRepresentantes();
    this.getMisCandidatosNoRepresentantes();
  }

  getMisCandidatosRepresentantes(){
    try {
      if( this.idsObj && this.idsObj["meRepresenta"].length > 0){        
        // console.log(this.counterSMR);
        for (let i = 0; i < this.chunksSMIds[this.counterSMR].length; i++) {
          this.getMisCandidato(this.chunksSMIds[this.counterSMR][i])
          // console.log(this.idsObj["meRepresenta"][i]);
        }
        this.counterSMR++;
      }
    } catch (error) {
      console.log("Algo paso con el obj meRepresenta");
    }
  }

  getMisCandidatosNoRepresentantes(){
    try {
      if( this.idsObj && this.idsObj["noMeRepresenta"].length > 0){
        // console.log(this.counterNMR);
        for (let i = 0; i < this.chunksNMIds[this.counterNMR].length; i++) {
          this.getMisNoCandidatos(this.chunksNMIds[this.counterNMR][i])
        }
        this.counterNMR++;
      }
    } catch (error) {
      console.log("Algo paso con el obj noMeRepresenta");
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

  onScrollNoMeReprenta(){
    console.log("mi lista onScrollNoMeReprenta");
    this.getMisCandidatosNoRepresentantes();

  }

  onScrollMeReprenta(){
    console.log("mi lista onScrollMeReprenta");
    this.getMisCandidatosRepresentantes();
  }

  getChunks(){
    try {
      let ids  = localStorage.getItem('ids_v1');
      let idsObj:any = JSON.parse(ids);
      this.idsObj = idsObj;
      let chunk = 10;

      let i=0,j=0,temparray;
      for (i=0,j=idsObj["noMeRepresenta"].length; i<j; i+=chunk) {
          temparray = idsObj["noMeRepresenta"].slice(i,i+chunk);
          this.chunksNMIds.push(temparray)
      }


      let l=0,m=0,temparray2;
      for (l=0,m=idsObj["meRepresenta"].length; l<m; l+=chunk) {
        temparray2 = idsObj["meRepresenta"].slice(l,l+chunk);
        // console.log(temparray2);
        this.chunksSMIds.push(temparray2)
      }
    } catch (error) {
      console.log("algo paso con el localStorage amigo");

    }
  }

}
