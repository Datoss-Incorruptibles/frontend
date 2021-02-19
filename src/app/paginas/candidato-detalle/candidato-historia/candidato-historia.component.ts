import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-candidato-historia',
  templateUrl: './candidato-historia.component.html',
  styleUrls: ['./candidato-historia.component.scss']
})
export class CandidatoHistoriaComponent implements OnInit {
  @Input() candidato;

  constructor() { }

  ngOnInit(): void {
  }

  

}
