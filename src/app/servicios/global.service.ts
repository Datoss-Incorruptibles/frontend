import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  messageSource = new BehaviorSubject('')
  currentMessage = this.messageSource.asObservable();
  path = '';

  constructor() { }


  changeText(text){
    this.messageSource.next(text)

  }
  

}
