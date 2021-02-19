import { Component, OnInit, Input, } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partido-plan-gobierno',
  templateUrl: './partido-plan-gobierno.component.html',
  styleUrls: ['./partido-plan-gobierno.component.scss']
})
export class PartidoPlanGobiernoComponent implements OnInit {
  @Input() partido;
  panelOpenState = false;
  plan:any;
  showLoader=false;

  constructor(private route: ActivatedRoute,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    //this.plan = this.restApiService.getPlanGobByPartidoId("1","1")
    //console.log(this.plan)
    this.getPlanGob("1")
  }
  getPlanGob(tipo){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
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
