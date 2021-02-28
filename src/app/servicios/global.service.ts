import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // filtros por region 
  filterRegionSource = new BehaviorSubject('140100') //seteado lima por defecto
  filterRegionIndexCurrent = this.filterRegionSource.asObservable();


  // filtro candidatos por partido
  filterPartidoSource = new BehaviorSubject('')
  filterPartidoIndexCurrent = this.filterPartidoSource.asObservable();

  //Filtro educacion
  filterEducacionSource = new BehaviorSubject('')
  filterEducacionIndexCurrent = this.filterEducacionSource.asObservable();

  //filtro Sentencias
  filterSentenciasSource = new BehaviorSubject('')
  filterSentenciasIndexCurrent = this.filterSentenciasSource.asObservable();

  //FILTROS CONGRESISTAS - DETALLE PARTIDO 
  filterRegionDPSource = new BehaviorSubject('140100') //seteado lima por defecto
  filterRegionDPIndexCurrent = this.filterRegionDPSource.asObservable();

  //Filtro educacion- DETALLE PARTIDO
  filterEducacionDPSource = new BehaviorSubject('')
  filterEducacionDPIndexCurrent = this.filterEducacionDPSource.asObservable();

  //filtro Sentencias- DETALLE PARTIDO
  filterSentenciasDPSource = new BehaviorSubject('')
  filterSentenciasDPIndexCurrent = this.filterSentenciasDPSource.asObservable();



  // filtro candidatos por partido y solo P.Andino
  filterPartidoPASource = new BehaviorSubject('')
  filterPartidoPAIndexCurrent = this.filterPartidoPASource.asObservable();


    //Filtro educacion
    filterEducacionPASource = new BehaviorSubject('')
    filterEducacionPAIndexCurrent = this.filterEducacionPASource.asObservable();
  
    //filtro Sentencias
    filterSentenciasPASource = new BehaviorSubject('')
    filterSentenciasPAIndexCurrent = this.filterSentenciasPASource.asObservable();

// PARLAMENTO ANDINO DETALLE PARTIDO
    //Filtro educacion
    filterEducacionPADPSource = new BehaviorSubject('')
    filterEducacionPADPIndexCurrent = this.filterEducacionPADPSource.asObservable();
  
    //filtro Sentencias
    filterSentenciasPADPSource = new BehaviorSubject('')
    filterSentenciasPADPIndexCurrent = this.filterSentenciasPADPSource.asObservable();




  // tab navigator 1 : CAndidatos
  tabIndexCandidatosSource = new BehaviorSubject(0)
  tabIndexCurrent = this.tabIndexCandidatosSource.asObservable();

  // tab navigator 2 // PA:partido candidato
  tabIndexPCSource = new BehaviorSubject(0)
  tabIndexPCCurrent = this.tabIndexPCSource.asObservable();



  // buscar candidato o partidos 
  // messageSource = new BehaviorSubject('')
  // currentMessage = this.messageSource.asObservable();

  constructor() { }


  // changeText(text){
  //   this.messageSource.next(text)
  // }

  // setTabIndex(number:any){
  //   this.tabIndexCandidatosSource.next(number)
  // }
  
  // setFilter(text){
  //   this.filterRegionSource.next(text)
  // }

}
