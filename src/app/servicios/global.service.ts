import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // filtros por region 
  filterRegionSource = new BehaviorSubject('140100')
  filterRegionIndexCurrent = this.filterRegionSource.asObservable();


  // filtro candidatos por partido
  filterPartidoSource = new BehaviorSubject('')
  filterPartidoIndexCurrent = this.filterPartidoSource.asObservable();

   // filtro candidatos por partido y solo P.Andino
   filterPartidoPASource = new BehaviorSubject('')
   filterPartidoPAIndexCurrent = this.filterPartidoPASource.asObservable();
 
 


  // tab navigator 1 : CAndidatos
  tabIndexCandidatosSource = new BehaviorSubject(0)
  tabIndexCurrent = this.tabIndexCandidatosSource.asObservable();

  // tab navigator 2 // PA:partido candidato
  tabIndexPCSource = new BehaviorSubject(0)
  tabIndexPCCurrent = this.tabIndexPCSource.asObservable();



  // buscar candidato o partidos 
  messageSource = new BehaviorSubject('')
  currentMessage = this.messageSource.asObservable();

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
