import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  tabIndexCandidatosSource = new BehaviorSubject(0)
  tabIndexCurrent = this.tabIndexCandidatosSource.asObservable();

  messageSource = new BehaviorSubject('')
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  setTabIndex(number:any){
    this.tabIndexCandidatosSource.next(number)
  }

  changeText(text){
    this.messageSource.next(text)
  }
  

}
