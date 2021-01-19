import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-partido-indicadores',
  templateUrl: 'detalle-partido-indicadores.component.html',
  styleUrls: ['detalle-partido-indicadores.component.scss']
})
export class DetallePartidoIndicadoresComponent implements OnInit {
  @Input() partido: any;
  
  indicadores:[];
  constructor() { }

  ngOnInit(): void {
    this.indicadores=this.partido.indicadorescategoriaorg;
    console.log(this.indicadores);
  }

}
