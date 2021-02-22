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
import { FormControl } from '@angular/forms';

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

  masFiltros= true;

  listOfDiferrentPages = []
  showLoader = false;

  REGIONES: Region[];
  ORGANIZACIONES: Partido[];

  unigeoIdSelect = ""; // Inicializado desde el servicio
  orgIdSelect :any;
  /*
  sinSelectRegion= true;
  sinSelectPartido = true;

  sinSelectEdu = true;
  SinSelecSentencias = true;
*/
  congresistas: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  selecEdu = new FormControl();
  selecSentencias = new FormControl();

  txtselecEdu:string;
  txtselecSentencias:string;
  //panelOpenState = false;

  constructor(
    private restApiService: RestApiService,
    private activeRoute: ActivatedRoute, 
    private global:GlobalService
    ) {

      this.global.filterRegionIndexCurrent.subscribe(message =>
        {
          this.unigeoIdSelect = message; 
         // console.log( this.unigeoIdSelect);
          
          //if(this.unigeoIdSelect) this.sinSelectRegion = false
  
        });
      this.global.filterPartidoIndexCurrent.subscribe(message =>
        {
          this.orgIdSelect = message;
         // console.log( this.orgIdSelect);
  
         // if(this.orgIdSelect) this.sinSelectPartido = false
        }
        );
        this.global.filterEducacionIndexCurrent.subscribe(message =>
          {
            this.txtselecEdu = message;
           // console.log( this.txtselecEdu);
  
           // if(this.txtselecEdu) this.sinSelectEdu = false
          }
          );
        this.global.filterSentenciasIndexCurrent.subscribe(message =>
            {
              this.txtselecSentencias = message;
             // console.log( this.txtselecSentencias);
    
             // if(this.txtselecSentencias) this.SinSelecSentencias = false
            }
          );  
        
     }


  ngOnInit(): void {
 
    this.getCongresistasOnFilters();
    // this.getCongresistasByRegion(this.unigeoIdSelect);//todos los partidos de Lima
    this.getRegiones();
    this.getOrganizaciones();
    //this.getCongresistasByOrAllCriterios():
    this.listenChangesOnText();
    
    //this.accordion();
    

  }

  getCongresistasOnFilters(){
    this.getCongresistasByOrAllCriterios(this.orgIdSelect,this.unigeoIdSelect,this.txtselecEdu,this.txtselecSentencias);
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
     // this.sinSelectRegion=true;
      this.global.filterRegionSource.next("");
      this.onFiltrar();
    }else{
      //this.sinSelectRegion=false;
      // this.unigeoIdSelect = value;
      this.global.filterRegionSource.next(value);
      // console.log(this.orgIdSelect);
      // console.log(this.orgSelect);
      this.onFiltrar();
    }
  }

  onFiltroOrganizacion(value: any){
    if(value=="sinseleccion2"){
     // this.sinSelectPartido=true;
      this.global.filterPartidoSource.next("");
      this.onFiltrar();
    }else{
     // this.sinSelectPartido=false;
      // this.orgIdSelect = value;
      this.global.filterPartidoSource.next(value);
      // console.log(this.orgIdSelect);
      // console.log(this.orgSelect);
      this.onFiltrar();
    }
  }

  onFiltroEdu(){
    if(this.selecEdu.value.length == 0 ){
     // this.sinSelectEdu==true;
     this.global.filterEducacionSource.next("");
      this.onFiltrar();
    }else{
     // this.sinSelectEdu==false;
      
      this.global.filterEducacionSource.next(this.selecEdu.value.toString());
      this.onFiltrar();
      //console.log((this.selecEdu.value).toString())
    }
  }

  onFiltroSentencias(){
      if(this.selecSentencias.value.length == 0 ){
     // this.SinSelecSentencias==true;
     this.global.filterSentenciasSource.next("");
      this.onFiltrar();
    }else{
      //this.SinSelecSentencias==false;
      this.global.filterSentenciasSource.next((this.selecSentencias.value).toString());
      //console.log((this.selecSentencias.value).toString());
      this.onFiltrar();
      
    }
  }
  
  getCongresistasByOrAllCriterios( organizacion_politica_id:string,ubigeo_postula:string,max_estudios_ids:string,indicador_ids:string){

    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){

      this.listOfDiferrentPages.push(this.nextPageUrl);
    
      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCandidatobyAllCriterios("4",organizacion_politica_id,ubigeo_postula,max_estudios_ids,indicador_ids).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
         //console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCandidatobyAllCriterios("4",organizacion_politica_id,ubigeo_postula,max_estudios_ids,indicador_ids,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          //console.log(this.congresistas);
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
    this.txtselecEdu = ""; // Inicializado desde el servicio
    this.txtselecSentencias = "";
    
    /*this.sinSelectRegion= false;
    this.sinSelectPartido = true;
    this.sinSelectEdu = true;
    this.SinSelecSentencias= true;*/
    this.listOfDiferrentPages = []

    this.nextPageUrl = "start";
    this.candidatoPageX;
  }

  onVerMas(){
    if(this.masFiltros==false){
      this.masFiltros=true;
      console.log(this.masFiltros);
    }else{
      this.masFiltros=false;
      console.log(this.masFiltros);
    }
  }
}
