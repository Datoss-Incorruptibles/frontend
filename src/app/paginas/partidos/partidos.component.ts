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
      if( res['status'] === 'success' ){
        
      }else{
      }
    }, error => {  });
  }

  fnAnios(anio){
    return (new Date()).getFullYear() - parseInt(anio);
  }

  fnIndicadores(partido,id){
    return partido.indicadorescategoriaorg.filter(elem => elem.indicador==id)
  }
}
