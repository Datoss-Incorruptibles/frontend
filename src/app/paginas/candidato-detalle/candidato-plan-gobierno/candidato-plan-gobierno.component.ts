import { Component, OnInit, Input, } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidato-plan-gobierno',
  templateUrl: './candidato-plan-gobierno.component.html',
  styleUrls: ['./candidato-plan-gobierno.component.scss']
})
export class CandidatoPlanGobiernoComponent implements OnInit {
  @Input() candidato;
  @Input() partido;
  panelOpenState = false;
  plan:any;
  showLoader=false;

  constructor(private route: ActivatedRoute,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    //this.plan = this.restApiService.getPlanGobByPartidoId("1","1")
    //console.log(this.plan)
    if (this.candidato && this.candidato.cargo_id==1){
      this.getPlanGob("1")
    } else if (this.candidato && this.candidato.cargo_id==5){
      //console.log("CARGO_ID: "+this.candidato.cargo_id)
      this.getPlanGob("3")
    } else {
      console.log("ERROR")
    }
    
  }
  getPlanGob(tipo){
    // get param id 
    this.showLoader = true;

    //const id = +this.route.snapshot.paramMap.get('id');
    const id =+this.candidato.organizacion_politica_id; 
    //console.log(id)
    this.restApiService.getPlanGobByPartidoId(id,tipo).subscribe(plan => {
    this.plan = plan;
    this.showLoader = false;

    //console.log(this.plan);
    })
  }
  onInitial(text){
    let tem = ""
    if (text != "") {
      tem = text.toLowerCase()
      tem = tem[0].toUpperCase() + tem.slice(1);
    }
    return tem
  }

}