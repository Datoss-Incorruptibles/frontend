import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { IPartidoAndino } from '../../../shared/_interfaces/partido-andino.interface';

@Component({
  selector: 'app-partido-andino',
  templateUrl: './partido-andino.component.html',
  styleUrls: ['./partido-andino.component.scss']
})
export class PartidoAndinoComponent implements OnInit {

  @Input() politicParty: any; 

  listParlamentoAndino: IPartidoAndino[];

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void { 
    this.restApiService.getParlamentoByOrganization(this.politicParty.id).subscribe((data: IPartidoAndino[])=>{
      this.listParlamentoAndino = data;
    });
  }

}
