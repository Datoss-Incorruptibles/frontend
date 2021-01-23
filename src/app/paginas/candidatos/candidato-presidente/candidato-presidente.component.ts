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
  selector: string = '.main-panel';
  fromPresidente = true;

  listOfDiferrentPages = []
  showLoader = false;

  presidentes: Candidato[];
  nextPageUrl ="start";
  presidentePageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

     }


  ngOnInit(): void {
    this.getPresidentes()
  }

  getPresidentes(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      this.listOfDiferrentPages.push(this.nextPageUrl);

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApiService.getPresidente().subscribe((res:any) =>{
          this.presidentes=res.results;   
          this.nextPageUrl = res.next                 
        }, error => {  });
      }else if (this.nextPageUrl){
        
        this.showLoader= true;

        this.restApiService.getPresidente(this.nextPageUrl).subscribe((res :any)=>{
          this.presidentePageX=<Candidato[]>res.results;            
          this.nextPageUrl = res.next;
          this.showLoader= false;

          this.presidentes = this.presidentes.concat(this.presidentePageX)
        }, error => {  });
      }
    }
  }

  onScrollA(){
    console.log("on scrool PRESINDENTES");
    this.getPresidentes();
  }

}
