import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Partido } from '../../../shared/_interfaces/partido.interface';
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
  orgIdSelect = 1;//Accion popular
  
  nextPageUrl = "start";
  listParlAndinoPageX;


  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.getParlamentoByOrganization(String(this.orgIdSelect));
    this.getOrganizaciones();
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
          console.log(this.listParAndino);
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
          // this.onFiltroRegion("LIMA");
          console.log(this.listParAndino);
          //this.onOrdernar();
        }, error => {  });
      }
    }
  }

  getOrganizaciones(){
    this.restApiService.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      console.log(this.ORGANIZACIONES);
    }, error => {  });;

  }
  onFiltroOrganizacion(value: number){
    //reset list
    this.listOfDiferrentPages = [];

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
    this.getParlamentoByOrganization( String(this.orgIdSelect));

  }

  onScroll(){
    console.log("on scrool Parlemnto andino");
    this.getParlamentoByOrganization(String(this.orgIdSelect));
  }
}
