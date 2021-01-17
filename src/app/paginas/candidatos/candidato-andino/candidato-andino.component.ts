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


  listParlamentoAndino: Candidato[];

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.restApiService.getParlamento().subscribe((data: Candidato[])=>{
      this.listParlamentoAndino = data;
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
}
