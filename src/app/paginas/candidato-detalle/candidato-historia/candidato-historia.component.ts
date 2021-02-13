import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-candidato-historia',
  templateUrl: './candidato-historia.component.html',
  styleUrls: ['./candidato-historia.component.scss']
})
export class CandidatoHistoriaComponent implements OnInit {
  @Input() candidato;
  civil:any ;
  penal:any;

  constructor() { }

  ngOnInit(): void {
    this.filterbySentencia();
  }

  filterbySentencia(){
    var sentencias =this.candidato.sentencias;

    this.civil =  sentencias.filter(element => element.tipo_proceso == "civil");
    this.penal =  sentencias.filter(element => element.tipo_proceso == "penal");


  }
  

}
