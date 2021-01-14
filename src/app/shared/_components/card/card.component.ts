import { Component, Input, OnInit } from '@angular/core';
import { IPartidoAndino } from '../../_interfaces/partido-andino.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() candidato: IPartidoAndino;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
