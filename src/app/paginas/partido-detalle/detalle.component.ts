import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from "src/app/servicios/global.service";
import {Meta, Title} from '@angular/platform-browser';
import { RestApiService } from "src/app/servicios/restapi.service";
import { Partido } from '../../shared/_interfaces/partido.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html',
  styleUrls: ['detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public tabIndex = 0; // detllae partido  
  ORGANIZACIONES: Partido[];

  partido=null;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private global:GlobalService,
    private restApi:RestApiService,
    private title: Title,
    private meta: Meta) {
    this.global.tabIndexPCCurrent.subscribe(message =>{
          this.tabIndex = message;
       }
      ); 

  }

  ngOnInit(): void {
    this.getOrganizaciones();
    // if(history.state.id){
    //   this.partido=history.state; 
    // }else{
    //   this.router.navigate(['/partidos']);
    // }
    this.getOrganizacionPolitica()

    
  }
  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
  getOrganizacionPolitica(){
    // this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.restApi.getOrganizacionPolitica(id).subscribe(partido => {
      this.partido = partido;
      // this.showLoader = false;
      // console.log(this.candidato);

      /* SEO Stuff */
      this.title.setTitle(`${this.partido.nombre}`);
      let description = `${this.partido.nombre}`
      this.meta.updateTag({name: "description", content:description});

    })
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


  setearTab(){
    if(this.tabIndex == 0){
      this.global.tabIndexCandidatosSource.next(0);
    }else{
      this.global.tabIndexCandidatosSource.next(this.tabIndex - 1);
    }
    this.global.tabIndexPCSource.next(this.tabIndex);

  }
  getOrganizaciones(){
    this.restApi.getOrganizacionesNames().subscribe((res:any) =>{
      this.ORGANIZACIONES=res.results;   
      // console.log(this.ORGANIZACIONES);
    }, error => {  });;

  }
  changePartido (value) {
    let ruta = "/partido/" + value + "/."
    this.router.navigate([ruta])
    //window.location.reload()
    console.log(ruta)
  }
}
