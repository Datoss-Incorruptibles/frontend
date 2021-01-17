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

  listParlamentoAndino: Candidato[];

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.restApiService.getParlamentoByOrganization(this.politicParty.id).subscribe((data: any)=>{
      this.listParlamentoAndino = <Candidato[]>data.results;
      this.onOrdernar();
    });
  }

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
  onScroll() {
    console.log('scrolled!!');
    // this.getPartidosPoliticos()
  }
}
