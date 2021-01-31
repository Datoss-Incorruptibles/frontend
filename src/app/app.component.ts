import { Component,OnInit } from '@angular/core';
import { GlobalService } from "./servicios/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Elecciones2021';
  showFiller=false;

  message;

  constructor(private global:GlobalService) { }

  ngOnInit(): void {
    this.global.currentMessage.subscribe(message =>this.message = message);

    
    // temporal , only to prevent crash with olds values saved in localStorage
    // try {
    //   if(localStorage.getItem("ids")){
    //     let ids = localStorage.getItem("ids")
    //     let idsObj:any = JSON.parse(ids);
    //     if( idsObj && idsObj["nomerepresenta"]){
    //       localStorage.removeItem("ids")
    //     } 
    //     if( idsObj &&  idsObj["merepresent"]){
    //       localStorage.removeItem("ids")
    //     } 
    //   }
    // } catch (error) {
    //   // console.log("algo bad sucedio amigo");
    // }

  }

}
