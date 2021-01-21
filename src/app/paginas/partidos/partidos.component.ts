import { Component, OnInit,Input,ViewChild} from '@angular/core';
import { RestApiService } from '../../servicios/restapi.service';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-partidos',
  templateUrl: 'partidos.component.html',
  styleUrls: ['partidos.component.scss']
})
export class PartidosComponent implements OnInit {
  constructor(private restApi:RestApiService) { }
  counter = 0;
  // @ViewChild(CdkVirtualScrollViewport)
  // viewport: CdkVirtualScrollViewport;

  showLoader = false;
  partidos:any=[];
  nextPageUrl = "start";
  partidosPageX
  listOfDiferrentPages = []

  onScroll() {
    console.log('scrolled!!');
    this.counter++;
    console.log(this.counter);
    this.getPartidosPoliticos()
  }

  ngOnInit(): void {

    this.getPartidosPoliticos()

  }



  getPartidosPoliticos(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      // console.log("NO HAY duplicado en array amigo");
      this.listOfDiferrentPages.push(this.nextPageUrl)

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApi.getOrganizacionPolitica().subscribe((res:any) =>{
          this.partidos=res.results;
          this.nextPageUrl = res.next;

          this.groupPartidosByIndicador()
          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });

      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApi.getOrganizacionPolitica(this.nextPageUrl).subscribe((res:any) =>{
          this.partidosPageX=res.results;
          this.nextPageUrl = res.next;
          this.showLoader= false;
          this.partidos = this.partidos.concat(this.partidosPageX)
          this.groupPartidosByIndicador();

          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });
      }

    }else{
      // console.log("hay duplicado en array amigo");
    }
  }

  groupPartidosByIndicador(){
    this.partidos.forEach(partido => {
      partido.indicadorCantidadEstudio=0;
      partido.indicadorCantidadSentencias=0;
      partido.indicadorCantidadTrayectoria=0;
      partido.indicadorescategoriaorg.forEach(indicador => {
        if(indicador != null){
        if(indicador.indicador==1 ) partido.indicadorCantidadEstudio+=indicador.cantidad;
        if(indicador.indicador==3) partido.indicadorCantidadSentencias+=indicador.cantidad;
        if(indicador.indicador==5) partido.indicadorCantidadTrayectoria+=indicador.cantidad;
        }
      });
      //console.log(this.partidos);
      this.onOrdernar("nombre");
    }, error => {  });
  }

  onOrdernar(parametro){
    //console.log(parametro);
    this.partidos=this.partidos.sort(function(a,b){
      //console.log(a[parametro] < b[parametro]);
        if(a[parametro] < b[parametro]) { return -1; }
        if(a[parametro] > b[parametro]) { return 1; }
      return 0;
    });
  }

  fnAnios(anio){
    return (new Date()).getFullYear() - parseInt(anio);
  }

  fnIndicadores(partido,id){
    return partido.indicadorescategoriaorg.filter(elem =>{
      if(elem != null){
        return  elem.indicador==id
      }
    });
  }
}
