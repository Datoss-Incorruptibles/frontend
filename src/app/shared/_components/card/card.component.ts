import { Component, Input, OnInit } from '@angular/core';
import { Candidato } from '../../_interfaces/candidato.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() candidato: Candidato;
  constructor() { }

  ngOnInit(): void {
  }


}
