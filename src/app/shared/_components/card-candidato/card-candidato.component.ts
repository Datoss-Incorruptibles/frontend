import { Component, Input, OnInit } from '@angular/core';
import { Candidato } from '../../_interfaces/candidato.interface';
@Component({
  selector: 'app-card-candidato',
  templateUrl: './card-candidato.component.html',
  styleUrls: ['./card-candidato.component.scss']
})
export class CardCandidatoComponent implements OnInit {
  @Input() candidato: Candidato;
  constructor() { }


  ngOnInit(): void {
  }

}
