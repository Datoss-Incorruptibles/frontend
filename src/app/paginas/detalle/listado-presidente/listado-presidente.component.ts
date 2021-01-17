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
      this.restApiService.getPresidenteByOrganization(this.politicParty.id).subscribe(res =>{
        this.presidente=<Candidato[]>res;            
        //console.log(this.presidente);
        this.onOrdernar();
      }, error => {  });
    }

  onOrdernar(){
    this.presidente = this.presidente.sort((n1,n2) => {
      if (n1.cargo_id > n2.cargo_id) {
          return 1;
      }
  
      if (n1.cargo_id < n2.cargo_id) {
          return -1;
      }
      return 0;

  });

  }
  onCargoPolitico(i){
    if(i == 0){
      return "Candidato a la Presidencia";
    }else if(i == 1){
      return "1er vice Presidente";
    }else{
      return "2do  vice Presidente";
    }
  }

}
