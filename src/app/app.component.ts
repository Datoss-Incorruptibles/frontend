import { Component,OnInit,EventEmitter,Output} from '@angular/core';
import { GlobalService } from "./servicios/global.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Elecciones2021';
  showFiller=false;

  // message;

  constructor(
    private global:GlobalService,
    private location: Location) { }
    @Output()public sidenavToggle = new EventEmitter();

  ngOnInit(): void {
    // canditato o partido stuff
    // this.global.currentMessage.subscribe(message =>this.message = message);

    
    // temporal , only to prevent crash with olds values saved in localStorage
    try {
      if(localStorage.getItem("ids")){
        let ids = localStorage.getItem("ids")
        // console.log(ids);
        let idsObj:any = JSON.parse(ids);
        if( idsObj && idsObj["noMeRepresenta"]){
          // console.log("entre a nomerepresenta");
          localStorage.removeItem("ids")
        } 
        if( idsObj &&  idsObj["meRepresenta"]){
          // console.log("entre a merepresent");
          localStorage.removeItem("ids")
        } 
      }
    } catch (error) {
      console.log("algo paso con el localStorage amigo");
    }

  }

  goBack(): void {
    // let index = 0;
    // // console.log(this.candidato.cargo_id );
    // if( this.candidato.cargo_id  == 1 || this.candidato.cargo_id  == 2 || this.candidato.cargo_id  == 3  ){
    //   index = 0;
    //   // console.log(index);
    // }else if( this.candidato.cargo_id == 4){
    //   index = 1;
    //   // console.log(index);
    // }else if( this.candidato.cargo_id == 5){
    //   index = 2;
    //   // console.log(index);
    // }
    
    // this.global.tabIndexCandidatosSource.next(index);
    // this.global.tabIndexPCSource.next(index + 1); // porque este tiene 4 tabs 

    this.location.back();
  }
  public onToggleSidenav = () =>{
    this.sidenavToggle.emit()
  }

}
