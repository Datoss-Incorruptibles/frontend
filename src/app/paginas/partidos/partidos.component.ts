import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../servicios/restapi.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {  
  constructor(private restApi:RestApiService) { }

  list=["","","","",""]

  ngOnInit(): void {
    this.restApi.getOrganizacionPolitica().subscribe(res =>{
      if( res['status'] === 'success' ){
        console.log(res);
      }else{
      }
    }, error => {  });
  }




}
