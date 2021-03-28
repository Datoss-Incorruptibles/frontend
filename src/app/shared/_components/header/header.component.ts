import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  href2

  constructor(private router: Router) { }
  @Output()public sidenavToggle = new EventEmitter();
  @Output()public sidehelpToggle = new EventEmitter();

  ngOnInit(): void {
    this.href2 = window.location.href
    // this.href = this.router.url;
    this.router.events.subscribe((event: any) => {
      this.href2 = window.location.href
    })


    // console.log(this.router.url);
    // console.log(window.location.href)

  }
  public onToggleSidenav = () =>{
    this.sidenavToggle.emit()
  }
  public onsidehelpToggle = () =>{
    this.sidenavToggle.emit()
  }
}
