import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { REGIONES } from '../../../shared/_constants/regiones'

@Component({
  selector: 'app-listado-congresista',
  templateUrl: './listado-congresista.component.html',
  styleUrls: ['./listado-congresista.component.scss']
})
export class ListadoCongresistaComponent implements OnInit {

  @Input() politicParty: any; 
  congresistas: Candidato[];
  congresistasTemp: Candidato[];
  REGIONES = REGIONES;
  regselect: string;


  nextPageUrl ="start";
  candidatoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCongresistasByOrganization();
    
  }

  getCongresistasByOrganization(){
    if(this.nextPageUrl == null)  {
      //do nothing
    }else if(this.nextPageUrl == "start"){
      this.restApiService.getCongresistasByOrganization(this.politicParty.id).subscribe((res:any) =>{
        this.congresistas=res.results;   
        this.nextPageUrl = res.next ;
        console.log(this.congresistas);
        // this.onFiltroRegion("LIMA");
      }, error => {  });
    }else if(this.nextPageUrl){
      this.restApiService.getCongresistasByOrganization(this.politicParty.id,this.nextPageUrl).subscribe((res :any)=>{
        this.candidatoPageX=<Candidato[]>res.results;            
        this.nextPageUrl = res.next 
        this.congresistas = this.congresistas.concat(this.candidatoPageX)
        // this.onFiltroRegion("LIMA");
        console.log(this.congresistas);
      }, error => {  });
    }
  }

  onFiltroRegion(value: string){
     this.regselect = value;
     let temp = this.congresistas.filter(congresista => congresista.distrito_electoral == value.toUpperCase());
     this.congresistasTemp =  this.onOrdernar(temp);
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

  onScroll(){
    console.log("on scrool detallle congresistas  ");
    this.getCongresistasByOrganization()
  }

}
