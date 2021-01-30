import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from "src/app/servicios/global.service";

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html',
  styleUrls: ['detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public tabIndex = 0; // detllae partido  

  partido=null;
  constructor(private route: ActivatedRoute, private router: Router,private global:GlobalService) {
    this.global.tabIndexCurrent.subscribe(message =>{
        if(message == 0){
          this.tabIndex = message
        }else {
          this.tabIndex = message + 1 ; // + 1 porque aqui hay 4 tabs y en el otro solo 3
        }
       }
      ); 

  }

  ngOnInit(): void {

    if(history.state.id){
      this.partido=history.state; 
    }else{
      this.router.navigate(['/partidos']);
    }
    
  }
  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
  fnAnios(anio){
    return (new Date()).getFullYear() - parseInt(anio);
  }
  fnIndicadores(partido,id){
    return partido.indicadorescategoriaorg.filter(elem =>{
      if(elem != null){
        return  elem.indicador==id
      }
    });
  }
  getCantIndicador(partido,id){
    let cont = 0;
    this.fnIndicadores(partido,id).forEach(element => {
      cont = element.cantidad + cont;
    }); 
    return cont;
  } 



}
