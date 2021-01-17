import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
@Component({
  selector: 'app-candidato-presidente',
  templateUrl: './candidato-presidente.component.html',
  styleUrls: ['./candidato-presidente.component.scss']
})
export class CandidatoPresidenteComponent implements OnInit {

  presidente: Candidato[];
  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {
      this.restApiService.getPresidente().subscribe(res =>{
        this.presidente=<Candidato[]>res;            
        //console.log(this.presidente);
        //this.onOrdernar();
      }, error => {  });
     }

  ngOnInit(): void {
  }

}
