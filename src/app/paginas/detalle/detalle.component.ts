import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html',
  styleUrls: ['detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  partido=null;
  constructor(private route: ActivatedRoute, private router: Router) {}

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
