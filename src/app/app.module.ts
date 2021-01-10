import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Material */
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

//
import { HttpClientModule } from '@angular/common/http';

 
/*Componnetes */
import { PartidosComponent } from './paginas/partidos/partidos.component';


@NgModule({
  declarations: [
    AppComponent,
    PartidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
