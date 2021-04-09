import { Component, OnInit } from '@angular/core';
import { RestApiService } from "src/app/servicios/restapi.service";

@Component({
  selector: 'app-como-votar',
  templateUrl: './como-votar.component.html',
  styleUrls: ['./como-votar.component.scss']
})
export class ComoVotarComponent implements OnInit {
  panelOpenState = false;
  widthScreen =  this.restApi.widthScreen
  constructor(private restApi:RestApiService) { }

  ngOnInit(): void {
   

  }

}
