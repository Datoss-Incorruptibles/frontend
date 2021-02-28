import { Component, OnInit ,Input,OnDestroy } from '@angular/core';
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
  selector: 'app-partido-andino',
  templateUrl: './partido-andino.component.html',
  styleUrls: ['./partido-andino.component.scss']
})
export class PartidoAndinoComponent implements OnInit {

  public notesText: string;
  private notesModelChanged: Subject<string> = new Subject<string>();
  private notesModelChangeSubscription: Subscription;
  value = '';
  @Input() politicParty: any; 
  
  fromPartido = true;
  showLoader = false;
  listOfDiferrentPages = []

  listParlamentoAndino: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  
  selecEdu = new FormControl();
  selecSentencias = new FormControl();

  txtselecEdu:string;
  txtselecSentencias:string;

  constructor(private restApiService: RestApiService,
    private global:GlobalService,
    private route: ActivatedRoute) {
      this.global.filterEducacionPADPIndexCurrent.subscribe(message =>
        {
          this.txtselecEdu = message;
         // console.log( this.txtselecEdu);

         // if(this.txtselecEdu) this.sinSelectEdu = false
        }
        );
      this.global.filterSentenciasPADPIndexCurrent.subscribe(message =>
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
    this.getCanAndinosOnFilters();
  }
/*
  getParlamentoByOrganization(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getParlamentoByOrganization(this.politicParty.id).subscribe((res:any) =>{
          this.listParlamentoAndino=res.results;   
          this.nextPageUrl = res.next ;
          // console.log(this.listParlamentoAndino);
          //this.onOrdernar();

        }, error => {  });

      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getParlamentoByOrganization(this.politicParty.id,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.listParlamentoAndino = this.listParlamentoAndino.concat(this.candidatoPageX)
          // console.log(this.listParlamentoAndino);
          //this.onOrdernar();

        }, error => {  });
      }
    }
  }
  */

  onFiltroEdu(){
    if(this.selecEdu.value.length == 0 ){
     // this.sinSelectEdu==true;
     this.global.filterEducacionPADPSource.next("");
      this.onFiltrar();
    }else{
     // this.sinSelectEdu==false;
      
      this.global.filterEducacionPADPSource.next(this.selecEdu.value.toString());
      this.onFiltrar();
      //console.log((this.selecEdu.value).toString())
    }
  }

  onFiltroSentencias(){
      if(this.selecSentencias.value.length == 0 ){
     // this.SinSelecSentencias==true;
     this.global.filterSentenciasPADPSource.next("");
      this.onFiltrar();
    }else{
      //this.SinSelecSentencias==false;
      this.global.filterSentenciasPADPSource.next((this.selecSentencias.value).toString());
      //console.log((this.selecSentencias.value).toString());
      this.onFiltrar();
      
    }
  }

  getCanAndinosOnFilters(){
    this.getCandAndinoByOrAllCriterios(this.txtselecEdu,this.txtselecSentencias);
  }

  onFiltrar(){
    //reset list
    this.listOfDiferrentPages = [];
    this.nextPageUrl = "start";
    // console.log(this.unigeoIdSelect); 
    // console.log(this.orgIdSelect);
    this.getCanAndinosOnFilters()
  }
  

  getCandAndinoByOrAllCriterios(max_estudios_ids:string,indicador_ids:string){
    const id = +this.route.snapshot.paramMap.get('id');
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){

      this.listOfDiferrentPages.push(this.nextPageUrl);
    
      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getCandidatobyAllCriterios("5",id,"",max_estudios_ids,indicador_ids).subscribe((res:any) =>{
          this.listParlamentoAndino=res.results;   
          this.nextPageUrl = res.next ;
         //console.log(this.congresistas);
        }, error => {  });
      }else if(this.nextPageUrl){
        this.restApiService.getCandidatobyAllCriterios("5",id,"",max_estudios_ids,indicador_ids,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next 
          this.listParlamentoAndino = this.listParlamentoAndino.concat(this.candidatoPageX)
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
        this.getCanAndinosOnFilters();
        // console.log(this.notesText, "entre");
      }else{
        this.restApiService.searchCandidatobyPartido(this.notesText,CHARGE.PARLAMENTO_ANDINO,id).subscribe((res :any)=>{
          this.listParlamentoAndino = res.results;
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
    this.listParlamentoAndino = [];

    this.txtselecEdu = ""; // Inicializado desde el servicio
    this.txtselecSentencias = "";
    this.listOfDiferrentPages = []

    this.nextPageUrl = "start";
    this.candidatoPageX;
  }







  onScroll(){
    // console.log("on scrool detallle LISTADO ANDINO ");
    this.getCanAndinosOnFilters();

  }
}
