import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../servicios/restapi.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {  
  constructor(private restApi:RestApiService) { }

  partidos:any=[];

  ngOnInit(): void {
    this.restApi.getOrganizacionPolitica().subscribe(res =>{
      console.log(res); 
      this.partidos=res;
      this.onOrdernar("nombre");
    }, error => {  });
  }

  onOrdernar(parametro){
    console.log(parametro);
    this.partidos=this.partidos.sort(function(a,b){
      console.log(a[parametro] < b[parametro]);
      
        if(a[parametro] < b[parametro]) { return -1; }
        if(a[parametro] > b[parametro]) { return 1; }
      return 0;      
    });
  }

  fnAnios(anio){
    return (new Date()).getFullYear() - parseInt(anio);
  }

  fnIndicadores(partido,id){
    return partido.indicadorescategoriaorg.filter(elem => elem.indicador==id)
  }
}
