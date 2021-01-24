import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Elecciones2021';
  showFiller=false;

  ngOnInit(): void {
    // temporal , only to prevent crash with olds values saved in localStorage
    localStorage.removeItem("ids")
  }
}
