import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-partido-indicadores',
  templateUrl: 'detalle-partido-indicadores.component.html',
  styleUrls: ['detalle-partido-indicadores.component.scss']
})
export class DetallePartidoIndicadoresComponent implements OnInit {
  @Input() partido: any;
  
  indicadores: any[];
  constructor() { }

  ngOnInit(): void {
    this.indicadores=this.partido.indicadorescategoriaorg;
    // console.log(this.indicadores);
  }
  getCantIndicador(id){
    let cont = 0;
    this.fnIndicadores(id).forEach(element => {
      cont = element.cantidad + cont;
    }); 
    return cont;
  }
  
  getCantidadEdSuperior(){
    let cont = 0;
    this.fnIndicadores(1).forEach(element => {
      if(element.indicador_categoria_nombre=="Técnicos"||element.indicador_categoria_nombre=="No univ."||element.indicador_categoria_nombre=="Universitario"||element.indicador_categoria_nombre=="Postgrado"){
        cont = element.cantidad + cont;
      }
    }); 
    return cont;
  }

  fnIndicadores(id){
    return this.indicadores.filter(elem =>{
      if(elem != null){
        return  elem.indicador==id
      }
    });
  }
  onInitial(text){
    let tem = text.toLowerCase( )
    return tem[0].toUpperCase() + tem.slice(1);
  }
  
}
