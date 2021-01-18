import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Region } from '../../../shared/_interfaces/region';
import { Partido } from '../../../shared/_interfaces/partido.interface';

@Component({
  selector: 'app-candidato-congresista',
  templateUrl: './candidato-congresista.component.html',
  styleUrls: ['./candidato-congresista.component.scss']
})
export class CandidatoCongresistaComponent implements OnInit {


  REGIONES: Region[];
  ORGANIZACIONES: Partido[];
  regSelect: string;
  orgSelect: string;
  unigeoIdSelect= "140100"; //Lima
  orgIdSelect = 1;//Accion popular

  congresistas: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect);
    this.getRegiones();
    this.getOrganizaciones();
 
  }

  onFiltroRegion(value: string){
    this.unigeoIdSelect = value;
    this.REGIONES.forEach(element => {
      if(element.id==value){
        this.regSelect=element.distrito_electoral;
        return ;
      }
    });
    console.log(this.unigeoIdSelect);
    console.log(this.regSelect);
    this.nextPageUrl = "start";
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect);

  }
  onFiltroOrganizacion(value: number){
    this.orgIdSelect = value;
    this.ORGANIZACIONES.forEach(element => {
      if(element.id==value){
        this.orgSelect=element.nombre;
        return ;
      }
    });
    console.log(this.orgIdSelect);
    console.log(this.orgSelect);
    this.nextPageUrl = "start";
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect);

  }

  onOrdernar() {
    this.congresistas = this.congresistas.sort((n1,n2) => {
      if (n1.jne_posicion > n2.jne_posicion) {
          return 1;
      }
      if (n1.jne_posicion < n2.jne_posicion) {
          return -1;
      }
      return 0;
    });
  }

  getCongresistasByOrganizacionAndRegion( organizacionId: string,unigeoId: string){
    if(this.nextPageUrl == null)  {
      //do nothing
    }else if(this.nextPageUrl == "start"){
      this.restApiService.getCongresistasByOrganizacionAndRegion(organizacionId,unigeoId).subscribe((res:any) =>{
        this.congresistas=res.results;   
        this.nextPageUrl = res.next ;
        console.log(this.congresistas);
         this.onOrdernar();
        // this.onFiltroRegion("LIMA");
      }, error => {  });
    }else if(this.nextPageUrl){
      this.restApiService.getCongresistasByOrganizacionAndRegion(organizacionId,unigeoId,this.nextPageUrl).subscribe((res :any)=>{
        this.candidatoPageX=<Candidato[]>res.results;            
        this.nextPageUrl = res.next 
        this.congresistas = this.congresistas.concat(this.candidatoPageX)
        // this.onFiltroRegion("LIMA");
        console.log(this.congresistas);
        this.onOrdernar();
      }, error => {  });
    }
  }


  getRegiones(){
    this.restApiService.getRegiones().subscribe((res:any) =>{
      this.REGIONES=res.results;   
      console.log(this.REGIONES);
    }, error => {  });;

  }

  getOrganizaciones(){
    this.restApiService.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      console.log(this.ORGANIZACIONES);
    }, error => {  });;

  }

  onScrollB(){
    console.log("on scrool CONGRESISTAS");
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect)
  }
}
