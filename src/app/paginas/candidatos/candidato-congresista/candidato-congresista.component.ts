import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { REGIONES } from '../../../shared/_constants/regiones'

@Component({
  selector: 'app-candidato-congresista',
  templateUrl: './candidato-congresista.component.html',
  styleUrls: ['./candidato-congresista.component.scss']
})
export class CandidatoCongresistaComponent implements OnInit {


  congresistasTemp: Candidato[];
  REGIONES = REGIONES;
  regselect: string;

  congresistas: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCongresistas()
    
  }

  // se filtrara desde back o con query params
  onFiltroRegion(value: string){
     this.regselect = value;
     console.log(this.congresistas);
     let temp = this.congresistas.filter(congresista => congresista.distrito_electoral == value.toUpperCase());
     console.log(temp);
     this.congresistasTemp =  this.onOrdernar(this.congresistas);
     console.log(this.congresistasTemp);
     
  }

  onOrdernar(congresistas:Candidato[]) : any {
    congresistas = congresistas.sort((n1,n2) => {
      if (n1.jne_posicion > n2.jne_posicion) {
          return 1;
      }
  
      if (n1.jne_posicion < n2.jne_posicion) {
          return -1;
      }
      return 0;

  });
  return congresistas;
  }
  getCongresistas(){
    if(this.nextPageUrl == null)  {
      //do nothing
    }else if(this.nextPageUrl == "start"){
      this.restApiService.getCongresistas().subscribe((res:any) =>{
        this.congresistas=res.results;   
        this.nextPageUrl = res.next ;
        console.log(this.congresistas);
        // this.onFiltroRegion("LIMA");
      }, error => {  });
    }else if(this.nextPageUrl){
      this.restApiService.getCongresistas(this.nextPageUrl).subscribe((res :any)=>{
        this.candidatoPageX=<Candidato[]>res.results;            
        this.nextPageUrl = res.next 
        this.congresistas = this.congresistas.concat(this.candidatoPageX)
        // this.onFiltroRegion("LIMA");
        console.log(this.congresistas);
      }, error => {  });
    }
  }

  onScrollB(){
    console.log("on scrool CONGRESISTAS");
    this.getCongresistas()
  }
}
