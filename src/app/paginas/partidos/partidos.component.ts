import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../servicios/restapi.service';

@Component({
  selector: 'app-partidos',
  templateUrl: 'partidos.component.html',
  styleUrls: ['partidos.component.scss']
})
export class PartidosComponent implements OnInit {  
  constructor(private restApi:RestApiService) { }

  partidos:any=[];

  ngOnInit(): void {
    this.restApi.getOrganizacionPolitica().subscribe(res =>{
      this.partidos=res;            
      ////////////
      this.partidos.forEach(partido => {
        partido.indicadorCantidadEstudio=0;
        partido.indicadorCantidadSentencias=0;
        partido.indicadorCantidadTrayectoria=0;
        partido.indicadorescategoriaorg.forEach(indicador => {
          if(indicador != null){
          if(indicador.indicador==1 ) partido.indicadorCantidadEstudio+=indicador.cantidad;
          if(indicador.indicador==3) partido.indicadorCantidadSentencias+=indicador.cantidad;
          if(indicador.indicador==5) partido.indicadorCantidadTrayectoria+=indicador.cantidad;
          }
        });
      });
      //console.log(this.partidos);
      this.onOrdernar("nombre");
    }, error => {  });
  }

  onOrdernar(parametro){
    //console.log(parametro);
    this.partidos=this.partidos.sort(function(a,b){
      //console.log(a[parametro] < b[parametro]);
        if(a[parametro] < b[parametro]) { return -1; }
        if(a[parametro] > b[parametro]) { return 1; }
      return 0;      
    });
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
}
