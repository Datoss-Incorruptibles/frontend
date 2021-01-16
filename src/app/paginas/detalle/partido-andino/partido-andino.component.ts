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
    this.restApiService.getParlamentoByOrganization(this.politicParty.id).subscribe((data: Candidato[])=>{
      this.listParlamentoAndino = data;
    });
  }

}
