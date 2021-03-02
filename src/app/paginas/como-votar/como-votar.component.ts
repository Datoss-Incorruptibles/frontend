import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-como-votar',
  templateUrl: './como-votar.component.html',
  styleUrls: ['./como-votar.component.scss']
})
export class ComoVotarComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
