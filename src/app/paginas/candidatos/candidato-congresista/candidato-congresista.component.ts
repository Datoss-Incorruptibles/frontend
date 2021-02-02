import { Component, OnInit , OnDestroy  } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Region } from '../../../shared/_interfaces/region';
import { Partido } from '../../../shared/_interfaces/partido.interface';
import { GlobalService } from "src/app/servicios/global.service";
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CHARGE } from 'src/app/shared/_constants/constant.commons';

@Component({
  selector: 'app-candidato-congresista',
  templateUrl: './candidato-congresista.component.html',
  styleUrls: ['./candidato-congresista.component.scss']
})
export class CandidatoCongresistaComponent implements OnInit {

  public notesText: string;
  private notesModelChanged: Subject<string> = new Subject<string>();
  private notesModelChangeSubscription: Subscription;
  value = '';


  listOfDiferrentPages = []
  showLoader = false;

  REGIONES: Region[];
  ORGANIZACIONES: Partido[];
  regSelect: string;
  orgSelect: string;

  unigeoIdSelect = ""; // Inicializado desde el servicio
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
          // console.log( this.unigeoIdSelect);
          
          if(this.unigeoIdSelect) this.sinSelectRegion = false

        });
      this.global.filterPartidoIndexCurrent.subscribe(message =>
        {
          this.orgIdSelect = message;
          // console.log( this.orgIdSelect);

          if(this.orgIdSelect) this.sinSelectPartido = false
        }
        );

     }


  ngOnInit(): void {
    this.getCongresistasOnFilters();
    // this.getCongresistasByRegion(this.unigeoIdSelect);//todos los partidos de Lima
    this.getRegiones();
    this.getOrganizaciones();

    this.listenChangesOnText()

  }

  getCongresistasOnFilters(){
    if(this.sinSelectPartido== true  && this.sinSelectRegion == false){
      this.getCongresistasByRegion(this.unigeoIdSelect);
    }else if(this.sinSelectPartido==true  && this.sinSelectRegion == true){
      this.getCongresistas();
    }else if(this.sinSelectPartido==false  && this.sinSelectRegion == true){
      this.getCongresistasByOrganizacion(String(this.orgIdSelect));
    }else{
    this.getCongresistasByOrganizacionAndRegion(String(this.orgIdSelect),this.unigeoIdSelect);
    }
  }

  onFiltrar(){
    //reset list
    this.listOfDiferrentPages = [];
    this.nextPageUrl = "start";
    // console.log(this.unigeoIdSelect); 
    // console.log(this.orgIdSelect);
    this.getCongresistasOnFilters()
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
    this.getCongresistasOnFilters()
    
    
  }

  listenChangesOnText(){
    this.notesModelChangeSubscription = this.notesModelChanged
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(newText => {
      this.notesText = newText;

      if(this.notesText == ''){
        this.reset()
        this.getCongresistasOnFilters();
        // console.log(this.notesText, "entre");
        
      }else{
        this.restApiService.searchCandidato(this.notesText,CHARGE.CONGRESISTA).subscribe((res :any)=>{
          this.congresistas = res.results;
        })
      }
    });
  }

  search(value){
    this.notesModelChanged.next(value);
  }

  ngOnDestroy() {
    this.notesModelChangeSubscription.unsubscribe();
  }

  reset(){
    this.congresistas = [];

    this.unigeoIdSelect = "140100"; // Inicializado desde el servicio
    this.orgIdSelect = "";
    
    this.sinSelectRegion= false;
    this.sinSelectPartido = true;
  
    this.listOfDiferrentPages = []

    this.nextPageUrl = "start";
    this.candidatoPageX;
  }
}
