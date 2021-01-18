import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';

@Component({
  selector: 'app-candidato-andino',
  templateUrl: './candidato-andino.component.html',
  styleUrls: ['./candidato-andino.component.scss']
})
export class CandidatoAndinoComponent implements OnInit {


  listParAndino: Candidato[];
  nextPageUrl = "start";
  listParlAndinoPageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.getParlAndino();
  }

  // se ordeanra desde back o con query params
  // onOrdernar(){
  //   this.listParlamentoAndino = this.listParlamentoAndino.sort((n1,n2) => {
  //     if (n1.jne_posicion > n2.jne_posicion) {
  //         return 1;
  //     }
  
  //     if (n1.jne_posicion < n2.jne_posicion) {
  //         return -1;
  //     }
  //     return 0;
  //  });
  // }

  getParlAndino(){
    if(this.nextPageUrl == null)  {
      //do nothing
    }else if(this.nextPageUrl == "start"){
      this.restApiService.getParlamento().subscribe((res:any) =>{
        this.listParAndino =res.results;   
        this.nextPageUrl = res.next                 
      }, error => {  });
    }else if(this.nextPageUrl){
      this.restApiService.getParlamento(this.nextPageUrl).subscribe((res :any)=>{
        this.listParlAndinoPageX=<Candidato[]>res.results;            
        this.nextPageUrl = res.next 
        this.listParAndino = this.listParAndino.concat(this.listParlAndinoPageX)
      }, error => {  });

    }
  }


  onScroll(){
    console.log("on scrool Parlemnto andino");
    this.getParlAndino()
  }
}
