import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Partido } from '../../../shared/_interfaces/partido.interface';
import { GlobalService } from "src/app/servicios/global.service";
@Component({
  selector: 'app-candidato-andino',
  templateUrl: './candidato-andino.component.html',
  styleUrls: ['./candidato-andino.component.scss']
})
export class CandidatoAndinoComponent implements OnInit {

  listOfDiferrentPages = []
  showLoader = false;

  ORGANIZACIONES: Partido[];
  listParAndino: Candidato[];
  orgSelect: string;

  orgIdSelect : any;//Sin seleccion  desde el servicio
  sinSelect= true;
  
  nextPageUrl = "start";
  listParlAndinoPageX;


  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute, 
    private global:GlobalService
    ) {
      this.global.filterPartidoPAIndexCurrent.subscribe(message =>this.orgIdSelect = message);
   }

  ngOnInit(): void { 
    if (this.orgIdSelect) {
      this.getParlamentoByOrganization( String(this.orgIdSelect));
    }else{
      this.getParlamento();
    }
    this.getOrganizaciones();
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

  getOrganizaciones(){
    this.restApiService.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      // console.log(this.ORGANIZACIONES);
    }, error => {  });;
  }

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

  onScroll(){
    // console.log("on scrool Parlemnto andino");
    if(this.sinSelect== true){
      this.getParlamento();
    }else{
      this.getParlamentoByOrganization(String(this.orgIdSelect));
    }
  }
}
