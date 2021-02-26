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
  plan2:any
  showLoader=false;
  planPres=true;

  constructor(private route: ActivatedRoute,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    //this.plan = this.restApiService.getPlanGobByPartidoId("1","1")
    this.getPlanGob("1")
    this.getPlanGob2("3")
    /*
    if (this.planPres==true){
      this.getPlanGob("1")
    } else if (this.planPres==false){
      this.getPlanGob("3")
    } else {
      console.log("ERROR")
    }*/
  }
  getPlanGob(tipo){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id)
    this.restApiService.getPlanGobByPartidoId(id,tipo).subscribe(plan => {
    this.plan = plan;
    this.showLoader = false;

    //console.log(this.plan);
    }, err => {
      console.log(err)
  })
  }
  getPlanGob2(tipo){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id)
    this.restApiService.getPlanGobByPartidoId(id,tipo).subscribe(plan2 => {
    this.plan2 = plan2;
    this.showLoader = false;

    }, err => {
      console.log(err)
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
  getPlanPres():void {
    //this.getPlanGob("1")
    //console.log(this.getPlanGob("1"))
    console.log("PRES")
  }
  getPlanParl():void{
    //this.getPlanGob("3")
    //console.log(this.getPlanGob("3"))
    console.log("PARL")
  }

}
