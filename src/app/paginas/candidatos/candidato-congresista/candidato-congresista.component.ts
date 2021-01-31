import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Region } from '../../../shared/_interfaces/region';
import { Partido } from '../../../shared/_interfaces/partido.interface';
import { GlobalService } from "src/app/servicios/global.service";

@Component({
  selector: 'app-candidato-congresista',
  templateUrl: './candidato-congresista.component.html',
  styleUrls: ['./candidato-congresista.component.scss']
})
export class CandidatoCongresistaComponent implements OnInit {


  listOfDiferrentPages = []
  showLoader = false;

  REGIONES: Region[];
  ORGANIZACIONES: Partido[];
  regSelect: string;
  orgSelect: string;

  unigeoIdSelect= ""; // Inicializado desde el servicio
  orgIdSelect :any;
  
  sinSelectRegion= true;
  sinSelectPartido = true;

  congresistas: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  constructor(
    private restApiService: RestApiService,
    private activeRoute: ActivatedRoute, 
    private global:GlobalService
    ) {
      this.global.filterRegionIndexCurrent.subscribe(message =>
        {
          this.unigeoIdSelect = message; 
          if(this.unigeoIdSelect) this.sinSelectRegion = false

        });
      this.global.filterPartidoIndexCurrent.subscribe(message =>
        {
          this.orgIdSelect = message;
          if(this.orgIdSelect) this.sinSelectPartido = false
        }
        );

     }

  ngOnInit(): void {
    if(this.sinSelectPartido== true  && this.sinSelectRegion == false){
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else if(this.sinSelectPartido==true  && this.sinSelectRegion == true){
      this.getCongresistas();
    }else if(this.sinSelectPartido==false  && this.sinSelectRegion == true){
      this.getCongresistasByOrganizacion(String(this.orgIdSelect));
    }else{
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect);
    }
    // this.getCongresistasByRegion(this.unigeoIdSelect);//todos los partidos de Lima
    this.getRegiones();
    this.getOrganizaciones();
  }


  onFiltrar(){
    //reset list
    this.listOfDiferrentPages = [];
    this.nextPageUrl = "start";
    // console.log(this.unigeoIdSelect); 
    // console.log(this.orgIdSelect);
    if(this.sinSelectPartido==true  && this.sinSelectRegion == false){
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else if(this.sinSelectPartido==true  && this.sinSelectRegion == true){
      this.getCongresistas();
    }else if(this.sinSelectPartido==false  && this.sinSelectRegion == true){
      this.getCongresistasByOrganizacion(String(this.orgIdSelect));
    }else{

    // console.log(this.unigeoIdSelect);
    // console.log(this.regSelect);
    this.getCongresistasByOrganizacionAndRegion(String(this.orgIdSelect),this.unigeoIdSelect);
    }
  }
  onFiltroRegion(value: any ){
    if(value=="sinseleccion1"){
      this.sinSelectRegion=true;
      this.onFiltrar();
    }else{
      this.sinSelectRegion=false;
      // this.unigeoIdSelect = value;
      this.global.filterRegionSource.next(value);

      this.REGIONES.forEach(element => {
        if(element.id==value){
          this.regSelect=element.distrito_electoral;
          return ;
        }
      });
      // console.log(this.orgIdSelect);
      // console.log(this.orgSelect);
      this.onFiltrar();
    }
  }

  onFiltroOrganizacion(value: any){
    if(value=="sinseleccion2"){
      this.sinSelectPartido=true;
      this.onFiltrar();
    }else{
      this.sinSelectPartido=false;
      // this.orgIdSelect = value;
      this.global.filterPartidoSource.next(value);

      this.ORGANIZACIONES.forEach(element => {
        if(element.id==value){
          this.orgSelect=element.nombre;
          return ;
        }
      });
      // console.log(this.orgIdSelect);
      // console.log(this.orgSelect);
      this.onFiltrar();
    }
  }

  getCongresistasByRegion(unigeoIdSelect: string){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCongresistasByRegion(unigeoIdSelect).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getCongresistasByRegion(unigeoIdSelect,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          // console.log(this.congresistas);
        }, error => {  });
      }
    }
  }

  getCongresistasByOrganizacion(orgIdSelect: string){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCongresistasByOrganization(orgIdSelect).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getCongresistasByOrganization(orgIdSelect,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          // console.log(this.congresistas);
        }, error => {  });
      }
    }
  }
  getCongresistasByOrganizacionAndRegion( organizacionId: string,unigeoId: string){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);
    
      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCongresistasByOrganizacionAndRegion(organizacionId,unigeoId).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCongresistasByOrganizacionAndRegion(organizacionId,unigeoId,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          // console.log(this.congresistas);
        }, error => {  });
      }
    }
  }

  getCongresistas(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCongresistas().subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getCongresistas(this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          // console.log(this.congresistas);
        }, error => {  });
      }
    }
  }


  getRegiones(){
    this.restApiService.getRegiones().subscribe((res:any) =>{
      this.REGIONES=res.results;   
      // console.log(this.REGIONES);
    }, error => {  });;

  }

  getOrganizaciones(){
    this.restApiService.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      // console.log(this.ORGANIZACIONES);
    }, error => {  });;

  }

  onScrollB(){
    // console.log("on scrool CONGRESISTAS");
    if(this.sinSelectPartido==true  && this.sinSelectRegion == false){
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else if(this.sinSelectPartido==true  && this.sinSelectRegion == true){
      this.getCongresistas();
    }else if(this.sinSelectPartido==false  && this.sinSelectRegion == true){
      this.getCongresistasByOrganizacion(String(this.orgIdSelect));
    }else{
    this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect);
    }
    
  }
}
