import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia-partido',
  templateUrl: './historia-partido.component.html',
  styleUrls: ['./historia-partido.component.scss']
})
export class HistoriaPartidoComponent implements OnInit {
  @Input() partido: any;
  constructor() { }

  ngOnInit(): void {
  }

}
