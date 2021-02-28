import { Component, OnInit, OnDestroy  } from '@angular/core';
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
  selector: 'app-listado-congresista',
  templateUrl: './listado-congresista.component.html',
  styleUrls: ['./listado-congresista.component.scss']
})
export class ListadoCongresistaComponent implements OnInit {
  public notesText: string;
  private notesModelChanged: Subject<string> = new Subject<string>();
  private notesModelChangeSubscription: Subscription;
  value = '';
  masFiltros= true;
  //@Input() politicParty: any; 
  fromPartido = true;
  showLoader = false;
  listOfDiferrentPages = []

  congresistas: Candidato[];
  REGIONES : Region[];
  regSelect: string;
  unigeoIdSelect = "";

  nextPageUrl ="start";
  candidatoPageX;

  selecEdu = new FormControl();
  selecSentencias = new FormControl();

  txtselecEdu:string;
  txtselecSentencias:string;



  constructor(private restApiService: RestApiService,
    private global:GlobalService,
    private route: ActivatedRoute
    ) {
      this.global.filterRegionDPIndexCurrent.subscribe(message =>
        {
          this.unigeoIdSelect = message; 
         // console.log( this.unigeoIdSelect);
          
          //if(this.unigeoIdSelect) this.sinSelectRegion = false
  
        });
        this.global.filterEducacionDPIndexCurrent.subscribe(message =>
          {
            this.txtselecEdu = message;
           // console.log( this.txtselecEdu);
  
           // if(this.txtselecEdu) this.sinSelectEdu = false
          }
          );
        this.global.filterSentenciasDPIndexCurrent.subscribe(message =>
            {
              this.txtselecSentencias = message;
             // console.log( this.txtselecSentencias);
    
             // if(this.txtselecSentencias) this.SinSelecSentencias = false
            }
          );  
    }

  ngOnInit(): void {
    this.getCongresistasOnFilters();
    this.getRegiones();
    this.listenChangesOnText();

    // console.log("here in congresistas ");
    
    
  }
  onFiltroRegion(value: any ){
    if(value=="sinseleccion1"){
     // this.sinSelectRegion=true;
      this.global.filterRegionDPSource.next("");
      this.onFiltrar();
    }else{
      //this.sinSelectRegion=false;
      // this.unigeoIdSelect = value;
      this.global.filterRegionDPSource.next(value);
      // console.log(this.orgIdSelect);
      // console.log(this.orgSelect);
      this.onFiltrar();
    }
  }
  onFiltroEdu(){
    if(this.selecEdu.value.length == 0 ){
     // this.sinSelectEdu==true;
     this.global.filterEducacionDPSource.next("");
      this.onFiltrar();
    }else{
     // this.sinSelectEdu==false;
      
      this.global.filterEducacionDPSource.next(this.selecEdu.value.toString());
      this.onFiltrar();
      //console.log((this.selecEdu.value).toString())
    }
  }
  onFiltroSentencias(){
    if(this.selecSentencias.value.length == 0 ){
   // this.SinSelecSentencias==true;
   this.global.filterSentenciasDPSource.next("");
    this.onFiltrar();
  }else{
    //this.SinSelecSentencias==false;
    this.global.filterSentenciasDPSource.next((this.selecSentencias.value).toString());
    //console.log((this.selecSentencias.value).toString());
    this.onFiltrar();
    
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
  
  getCongresistasOnFilters(){
    this.getCongresistasByOrAllCriterios(this.unigeoIdSelect,this.txtselecEdu,this.txtselecSentencias);
  }

  getCongresistasByOrAllCriterios( ubigeo_postula:string,max_estudios_ids:string,indicador_ids:string){
    const id = +this.route.snapshot.paramMap.get('id');
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){

      this.listOfDiferrentPages.push(this.nextPageUrl);
    
      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCandidatobyAllCriterios("4",id,ubigeo_postula,max_estudios_ids,indicador_ids).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
         //console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCandidatobyAllCriterios("4",id,ubigeo_postula,max_estudios_ids,indicador_ids,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          //console.log(this.congresistas);
        }, error => {  });
      }
    }
  }


  listenChangesOnText(){
    const id = +this.route.snapshot.paramMap.get('id');
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
        this.restApiService.searchCandidatobyPartido(this.notesText,CHARGE.CONGRESISTA,id).subscribe((res :any)=>{
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
    //this.orgIdSelect = "";
    this.txtselecEdu = ""; // Inicializado desde el servicio
    this.txtselecSentencias = "";
    
    /*this.sinSelectRegion= false;
    this.sinSelectPartido = true;
    this.sinSelectEdu = true;
    this.SinSelecSentencias= true;*/
    this.listOfDiferrentPages = [];

    this.nextPageUrl = "start";
    this.candidatoPageX;
  }


  /*
  onFiltroRegion(value: string){
    //reset list
    this.listOfDiferrentPages = [];
    // this.unigeoIdSelect = value;
    this.global.filterRegionSource.next(value);

    this.REGIONES.forEach(element => {
      if(element.id==value){
        this.regSelect=element.distrito_electoral;
        return ;
      }
    });
    // console.log(this.unigeoIdSelect);
    // console.log(this.regSelect);
    this.nextPageUrl = "start";
    this.getCongresistasByOrganizacionAndRegion(this.unigeoIdSelect);

  }

  getCongresistasByOrganizacionAndRegion(unigeoId: string){
    const id = +this.route.snapshot.paramMap.get('id');
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCongresistasByOrganizacionAndRegion(id.toString(),unigeoId).subscribe((res:any) =>{
          this.congresistas=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.congresistas);
          //this.onOrdernar();
          // this.onFiltroRegion("LIMA");
        }, error => {  });
      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getCongresistasByOrganizacionAndRegion(id.toString(),unigeoId,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.congresistas = this.congresistas.concat(this.candidatoPageX)
          // this.onFiltroRegion("LIMA");
          // console.log(this.congresistas);
          //this.onOrdernar();
        }, error => {  });
      }

    }
  }

/*

  onFiltroRegion(value: string){
     this.regselect = value;
     let temp = this.congresistas.filter(congresista => congresista.distrito_electoral == value.toUpperCase());
     this.congresistasTemp =  this.onOrdernar(temp);
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
*/
  getRegiones(){
    this.restApiService.getRegiones().subscribe((res:any) =>{
      this.REGIONES=res.results;   
      // console.log(this.REGIONES);
      // this.onFiltroRegion("LIMA");
    }, error => {  });;

  }

  onScroll(){
    // console.log("on scrool detallle congresistas  ");
    this.getCongresistasOnFilters()
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

}
