import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Elecciones2021';
  showFiller=false;

  ngOnInit(): void {
    // temporal , only to prevent crash with olds values saved in localStorage
    try {
      if(localStorage.getItem("ids")){
        let ids = localStorage.getItem("ids")
        let idsObj:any = JSON.parse(ids);
        if( idsObj && idsObj["nomerepresenta"]){
          localStorage.removeItem("ids")
        } 
        if( idsObj &&  idsObj["merepresent"]){
          localStorage.removeItem("ids")
        } 
      }
    } catch (error) {
      console.log("algo bad sucedio amigo");
    }

  }
}
