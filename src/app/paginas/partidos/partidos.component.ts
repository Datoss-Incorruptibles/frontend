import { Component,Input,ViewChild} from '@angular/core';
import { GlobalService } from "src/app/servicios/global.service";
import { RestApiService } from '../../servicios/restapi.service';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-partidos',
  templateUrl: 'partidos.component.html',
  styleUrls: ['partidos.component.scss']
})
export class PartidosComponent  {
  constructor(private restApi:RestApiService,private global:GlobalService,
    private title: Title,
    private meta: Meta) { 
    // if(window.location.hash.includes("partido")){
    //   this.global.messageSource.next("partido")
    // }

  }
  counter = 0;
  // @ViewChild(CdkVirtualScrollViewport)
  // viewport: CdkVirtualScrollViewport;
  showLoader = false;
  partidos:any=[];
  nextPageUrl = "start";
  partidosPageX
  listOfDiferrentPages = []


  onScrollA() {
    // console.log('scrolled!!');
    this.counter++;
    // console.log(this.counter);
    this.getPartidosPoliticos();


  }

  ngOnInit(): void {

    this.getPartidosPoliticos();

    /* SEO Stuff */
    this.title.setTitle(`candidatos.pe`);
    let description = `Lista de todos los partidos politicos para las elecciones del 2021`
    this.meta.updateTag({name: "description", content:description});
  }

  getPartidosPoliticos(){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      // console.log("NO HAY duplicado en array amigo");
      this.listOfDiferrentPages.push(this.nextPageUrl)

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApi.getOrganizacionesPolitica().subscribe((res:any) =>{
          this.partidos=res.results;
          this.nextPageUrl = res.next;

          //this.groupPartidosByIndicador()
          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });

      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApi.getOrganizacionesPolitica(this.nextPageUrl).subscribe((res:any) =>{
          this.partidosPageX=res.results;
          this.nextPageUrl = res.next;
          this.showLoader= false;
          this.partidos = this.partidos.concat(this.partidosPageX)
          //this.groupPartidosByIndicador();

          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });
      }

    }else{
      // console.log("hay duplicado en array amigo");
    }
  }
  getOrganizacionesbyOrdering(ordering:string){
    if(!this.listOfDiferrentPages.includes(this.nextPageUrl)){
      // console.log("NO HAY duplicado en array amigo");
      this.listOfDiferrentPages.push(this.nextPageUrl)

      if(this.nextPageUrl == null)  {
        //do nothing
      }else if(this.nextPageUrl == "start"){
        this.restApi.getOrganizacionesbyOrdering(ordering).subscribe((res:any) =>{
          this.partidos=res.results;
          this.nextPageUrl = res.next;

          //this.groupPartidosByIndicador()
          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });

      }else if(this.nextPageUrl){
        this.showLoader= true;

        this.restApi.getOrganizacionesbyOrdering(ordering,this.nextPageUrl).subscribe((res:any) =>{
          this.partidosPageX=res.results;
          this.nextPageUrl = res.next;
          this.showLoader= false;
          this.partidos = this.partidos.concat(this.partidosPageX)
          //this.groupPartidosByIndicador();

          // console.log(this.partidos);
          // this.onOrdernar("nombre");
        }, error => {  });
      }

    }else{
      // console.log("hay duplicado en array amigo");
    }
  }
  onOrdernar(parametro){
    this.listOfDiferrentPages = [];
    this.nextPageUrl = "start";
    this.getOrganizacionesbyOrdering(parametro);
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
  getCantIndicador(partido,id){
    let cont = 0;
    this.fnIndicadores(partido,id).forEach(element => {
      cont = element.cantidad + cont;
    }); 
    return cont;
  } 
  getCantidadEdSuperior(partido){
    let cont = 0;
    this.fnIndicadores(partido,1).forEach(element => {
      if(element.indicador_categoria!=4){
        cont = element.cantidad + cont;
      }
    }); 
    return cont;
  }

  getCantidadIngresoProm(partido){
    let cont = 0;
    this.fnIndicadores(partido,10).forEach(element => {
      if(element.indicador_categoria_nombre == "Ingresos"){
        cont = element.cantidad + cont;
      }
    }); 
    return cont;
  }

}
