import { Component, OnInit , OnDestroy } from '@angular/core';
import { RestApiService } from '../../../servicios/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Candidato } from '../../../shared/_interfaces/candidato.interface';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CHARGE } from 'src/app/shared/_constants/constant.commons';

@Component({
  selector: 'app-candidato-presidente',
  templateUrl: './candidato-presidente.component.html',
  styleUrls: ['./candidato-presidente.component.scss']
})
export class CandidatoPresidenteComponent implements OnInit {

  public notesText: string;
  private notesModelChanged: Subject<string> = new Subject<string>();
  private notesModelChangeSubscription: Subscription;
  value = '';

  
  fromPresidente = true;

  listOfDiferrentPages = [];
  showLoader = false;

  presidentes: Candidato[];
  nextPageUrl ="start";
  presidentePageX;

  constructor(private restApiService: RestApiService,
    private activeRoute: ActivatedRoute) {

     }


  ngOnInit(): void {
    this.getPresidentes();
    this.listenChangesOnText();
  }

  listenChangesOnText(){
    this.notesModelChangeSubscription = this.notesModelChanged
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(newText => {

      this.notesText = newText;

      if(this.notesText == ''){
        
        this.reset()
        this.getPresidentes();
        // console.log(this.notesText, "entre");
        
      }else{
        this.restApiService.searchCandidato(this.notesText,CHARGE.PRESIDENTE).subscribe((res :any)=>{
          this.presidentes = res.results;
        })
      }
    });
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
    // console.log("on scrool PRESINDENTES");
    this.getPresidentes();
  }
  
  search(value){
    this.notesModelChanged.next(value);

  }

  ngOnDestroy() {
    this.notesModelChangeSubscription.unsubscribe();
  }

  reset(){
    this.presidentes = [];
    this.nextPageUrl = "start";
    this.presidentePageX;
    this.listOfDiferrentPages = [];
  }
}
