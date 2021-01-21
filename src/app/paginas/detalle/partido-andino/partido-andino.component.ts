import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
 

@Component({
  selector: 'app-partido-andino',
  templateUrl: './partido-andino.component.html',
  styleUrls: ['./partido-andino.component.scss']
})
export class PartidoAndinoComponent implements OnInit {

  @Input() politicParty: any; 
  
  fromPartido = true;
  showLoader = false;
  listOfDiferrentPages = []

  listParlamentoAndino: Candidato[];
  nextPageUrl = "start";
  candidatoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.getParlamentoByOrganization();
  }

  getParlamentoByOrganization(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getParlamentoByOrganization(this.politicParty.id).subscribe((res:any) =>{
          this.listParlamentoAndino=res.results;   
          this.nextPageUrl = res.next ;
          console.log(this.listParlamentoAndino);
          //this.onOrdernar();

        }, error => {  });

      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApiService.getParlamentoByOrganization(this.politicParty.id,this.nextPageUrl).subscribe((res :any)=>{
          this.candidatoPageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.listParlamentoAndino = this.listParlamentoAndino.concat(this.candidatoPageX)
          console.log(this.listParlamentoAndino);
          //this.onOrdernar();

        }, error => {  });
      }
    }
  }
/*
  onOrdernar(){
    this.listParlamentoAndino = this.listParlamentoAndino.sort((n1,n2) => {
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
  onScroll(){
    console.log("on scrool detallle LISTADO ANDINO ");
    this.getParlamentoByOrganization();

  }
}
