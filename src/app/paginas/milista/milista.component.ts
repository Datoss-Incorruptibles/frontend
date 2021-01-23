import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-milista',
  templateUrl: './milista.component.html',
  styleUrls: ['./milista.component.scss']
})
export class MilistaComponent implements OnInit {


  misCandidatos = [];
  showLoader;
  constructor() { }

  ngOnInit(): void {
    // get id from local storage
    

  }


  onScroll(){

  }

}
