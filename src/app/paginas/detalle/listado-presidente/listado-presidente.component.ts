import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';

@Component({
  selector: 'app-listado-presidente',
  templateUrl: './listado-presidente.component.html',
  styleUrls: ['./listado-presidente.component.scss']
})
export class ListadoPresidenteComponent implements OnInit {

  @Input() politicParty: any; 
  presidente: Candidato[];

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.restApiService.getPresidenteByOrganization(this.politicParty.id).subscribe((data: Candidato[])=>{
      this.presidente = data;
    });
  }

}
