import { Component, OnInit,ViewChild} from '@angular/core';
import { RestApiService } from '../../servicios/restapi.service';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-partidos',
  templateUrl: 'partidos.component.html',
  styleUrls: ['partidos.component.scss']
})
export class PartidosComponent implements OnInit {  
  constructor(private restApi:RestApiService) { }


  // @ViewChild(CdkVirtualScrollViewport)
  // viewport: CdkVirtualScrollViewport;


  partidos:any=[];
  nextPageUrl ="";
  partidosPageX


  onScroll() {
    console.log('scrolled!!');
    this.getPartidosPoliticos()
  }

  ngOnInit(): void {

    this.getPartidosPoliticos()

  }



  getPartidosPoliticos(){

    if(this.nextPageUrl){
      this.restApi.getOrganizacionPolitica(this.nextPageUrl).subscribe((res:any) =>{
        this.partidosPageX=res.results;   
        this.nextPageUrl = res.next 
        this.partidos = this.partidos.concat(this.partidosPageX)
  
        ////////////
        this.groupPartidosByIndicador()
        console.log(this.partidos);
        this.onOrdernar("nombre");
      }, error => {  });
    }else{
      this.restApi.getOrganizacionPolitica().subscribe((res:any) =>{
        this.partidos=res.results;   
        this.nextPageUrl = res.next                 
        // this.partidos=res;                     
        ////////////
        this.groupPartidosByIndicador()
        console.log(this.partidos);
        this.onOrdernar("nombre");
      }, error => {  });
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
    });
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
