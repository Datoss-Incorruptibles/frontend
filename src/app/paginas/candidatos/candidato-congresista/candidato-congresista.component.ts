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


  listOfDiferrentPages = []
  showLoader = false;

  REGIONES: Region[];
  ORGANIZACIONES: Partido[];
  regSelect: string;
  orgSelect: string;
  unigeoIdSelect= "140100"; //Lima
  orgIdSelect :number;
  sinSelect = true;

  congresistas: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCongresistasByRegion(this.unigeoIdSelect);
    this.getRegiones();
    this.getOrganizaciones();
  }


  onFiltroRegion(value: string){
    //reset list
    this.listOfDiferrentPages = [];
    if(this.sinSelect==true){
      this.nextPageUrl = "start";
      this.unigeoIdSelect = value;
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else{
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
  }

  onFiltroOrganizacion(value: any){
    //reset list
    this.listOfDiferrentPages = [];
    if(value=="sinseleccion"){
      this.nextPageUrl = "start";
      this.sinSelect=true;
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else{
      this.sinSelect=false;
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
          console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getCongresistasByRegion(unigeoIdSelect,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          console.log(this.congresistas);
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
          console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCongresistasByOrganizacionAndRegion(organizacionId,unigeoId,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          console.log(this.congresistas);
        }, error => {  });
      }
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
    if(this.sinSelect=true){
      this.getCongresistasByRegion(String(this.orgIdSelect));
    }else{
      this.getCongresistasByOrganizacionAndRegion( String(this.orgIdSelect),this.unigeoIdSelect)
    }
    
  }
}
