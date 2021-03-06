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
  fromPartido = true;
  presidente: Candidato[];
  fromPresidente = true;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) { }
    ngOnInit(): void {
      this.restApiService.getPresidenteByOrganization(this.politicParty.id).subscribe((res :any) =>{
        this.presidente=<Candidato[]>res.results;            
        // console.log(this.presidente);
        //this.onOrdernar();
      }, error => {  });
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


  onScroll(){
    // console.log("on scrool detallle LISTADO PRESIDNETE ");
    // this.getParlAndino()
  }
}
