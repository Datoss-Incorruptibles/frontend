import { Component, OnInit ,OnDestroy } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Partido } from '../../../shared/_interfaces/partido.interface';
import { GlobalService } from "src/app/servicios/global.service";
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CHARGE } from 'src/app/shared/_constants/constant.commons';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-candidato-andino',
  templateUrl: './candidato-andino.component.html',
  styleUrls: ['./candidato-andino.component.scss']
})
export class CandidatoAndinoComponent implements OnInit {
  public notesText: string;
  private notesModelChanged: Subject<string> = new Subject<string>();
  private notesModelChangeSubscription: Subscription;
  value = '';


  masFiltros= true;

  listOfDiferrentPages = []
  showLoader = false;

  ORGANIZACIONES: Partido[];
  listParAndino: Candidato[];
  orgSelect: string;

  orgIdSelect : any;//Sin seleccion  desde el servicio
  sinSelect= true;
  
  nextPageUrl = "start";
  listParlAndinoPageX;

  selecEdu = new FormControl();
  selecSentencias = new FormControl();

  txtselecEdu:string;
  txtselecSentencias:string;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute, 
    private global:GlobalService
    ) {
      this.global.filterPartidoPAIndexCurrent.subscribe(message =>this.orgIdSelect = message);
      this.global.filterEducacionPAIndexCurrent.subscribe(message =>
        {
          this.txtselecEdu = message;
         // console.log( this.txtselecEdu);

         // if(this.txtselecEdu) this.sinSelectEdu = false
        }
        );
      this.global.filterSentenciasPAIndexCurrent.subscribe(message =>
          {
            this.txtselecSentencias = message;
           // console.log( this.txtselecSentencias);
  
           // if(this.txtselecSentencias) this.SinSelecSentencias = false
          }
        );  
      
   }


  ngOnInit(): void { 
    this.listenChangesOnText();
    //this.getParlAndiOnFilters();
    this.getOrganizaciones();
    this.getCanAndinosOnFilters();
  }

/*
  getParlAndiOnFilters(){
    if (this.orgIdSelect) {
      this.getParlamentoByOrganization( String(this.orgIdSelect));
    }else{
      this.getParlamento();
    }

  }

  getParlamento(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getParlamento().subscribe((res:any) =>{
          this.listParAndino=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.listParAndino);
          //this.onOrdernar();
          // this.onFiltroRegion("LIMA");
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getParlamento(this.nextPageUrl).subscribe((res :any)=>{
          this.listParlAndinoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.listParAndino = this.listParAndino.concat(this.listParlAndinoPageX)
          // this.onFiltroRegion("LIMA");
          // console.log(this.listParAndino);
          //this.onOrdernar();
        }, error => {  });
      }
    }
  }
  
  getParlamentoByOrganization( organizacionId: string){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getParlamentoByOrganization(organizacionId).subscribe((res:any) =>{
          this.listParAndino=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.listParAndino);
          //this.onOrdernar();
          // this.onFiltroRegion("LIMA");
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getParlamentoByOrganization(organizacionId,this.nextPageUrl).subscribe((res :any)=>{
          this.listParlAndinoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.listParAndino = this.listParAndino.concat(this.listParlAndinoPageX)
        }, error => {  });
      }
    }
  }
*/

getCanAndinosOnFilters(){
  this.getCandAndinoByOrAllCriterios(this.orgIdSelect,this.txtselecEdu,this.txtselecSentencias);
}
onFiltrar(){
  //reset list
  this.listOfDiferrentPages = [];
  this.nextPageUrl = "start";
  // console.log(this.unigeoIdSelect); 
  // console.log(this.orgIdSelect);
  this.getCanAndinosOnFilters()
}


onFiltroOrganizacion(value: any){
  if(value=="sinseleccion2"){
   // this.sinSelectPartido=true;
    this.global.filterPartidoPASource.next("");
    this.onFiltrar();
  }else{
   // this.sinSelectPartido=false;
    // this.orgIdSelect = value;
    this.global.filterPartidoPASource.next(value);
    // console.log(this.orgIdSelect);
    // console.log(this.orgSelect);
    this.onFiltrar();
  }
}

  getOrganizaciones(){
    this.restApiService.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      // console.log(this.ORGANIZACIONES);
    }, error => {  });;
  }
  
  onFiltroEdu(){
    if(this.selecEdu.value.length == 0 ){
     // this.sinSelectEdu==true;
     this.global.filterEducacionPASource.next("");
      this.onFiltrar();
    }else{
     // this.sinSelectEdu==false;
      
      this.global.filterEducacionPASource.next(this.selecEdu.value.toString());
      this.onFiltrar();
      //console.log((this.selecEdu.value).toString())
    }
  }

  onFiltroSentencias(){
      if(this.selecSentencias.value.length == 0 ){
     // this.SinSelecSentencias==true;
     this.global.filterSentenciasPASource.next("");
      this.onFiltrar();
    }else{
      //this.SinSelecSentencias==false;
      this.global.filterSentenciasPASource.next((this.selecSentencias.value).toString());
      //console.log((this.selecSentencias.value).toString());
      this.onFiltrar();
      
    }
  }

  getCandAndinoByOrAllCriterios( organizacion_politica_id:string,max_estudios_ids:string,indicador_ids:string){

    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){

      this.listOfDiferrentPages.push(this.nextPageUrl);
    
      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCandidatobyAllCriterios("5",organizacion_politica_id,"",max_estudios_ids,indicador_ids).subscribe((res:any) =>{
          this.listParAndino=res.results;   
          this.nextPageUrl = res.next ;
         //console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCandidatobyAllCriterios("5",organizacion_politica_id,"",max_estudios_ids,indicador_ids,this.nextPageUrl).subscribe((res :any)=>{
          this.listParlAndinoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.listParAndino = this.listParAndino.concat(this.listParlAndinoPageX)
          //console.log(this.congresistas);
        }, error => {  });
      }
    }
  }



  
/*
  onFiltroOrganizacion(value: any){
     //reset list
    this.listOfDiferrentPages = [];
    this.nextPageUrl = "start";
    if(value=="sinseleccion"){
      this.getParlamento();
    }else {
    this.orgIdSelect = value;
    this.global.filterPartidoPASource.next(value);

    this.ORGANIZACIONES.forEach(element => {
      if(element.id==value){
        this.orgSelect=element.nombre;
        return ;
      }
    });
    // console.log(this.orgIdSelect);
    // console.log(this.orgSelect);
    
    this.getParlamentoByOrganization( String(this.orgIdSelect));

    }
   

  }
*/
  onScroll(){
    // console.log("on scrool Parlemnto andino");
    this.getCanAndinosOnFilters();
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
        this.getCanAndinosOnFilters();
        // console.log(this.notesText, "entre");
      }else{
        this.restApiService.searchCandidato(this.notesText,CHARGE.PARLAMENTO_ANDINO).subscribe((res :any)=>{
          this.listParAndino = res.results;
          // console.log(this.listParAndino);

        })
      }
      // console.log(newText);
    });
  }

  search(value){
    this.notesModelChanged.next(value);
  }

  ngOnDestroy() {
    this.notesModelChangeSubscription.unsubscribe();
  }

  reset(){
    this.listParAndino = [];

    this.txtselecEdu = ""; // Inicializado desde el servicio
    this.txtselecSentencias = "";
    this.orgIdSelect = "";
    this.sinSelect = true;
    this.listOfDiferrentPages = []

    this.nextPageUrl = "start";
    this.listParlAndinoPageX;
  }
  onVerMas(){
    if(this.masFiltros==false){
      this.masFiltros=true;
      //console.log(this.masFiltros);
    }else{
      this.masFiltros=false;
      //console.log(this.masFiltros);
    }
  }

  toggleElegidos(e){
    console.log(e);
    this.restApiService.checkedElecto = e ;
  }
}
