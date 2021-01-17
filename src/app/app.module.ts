import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Material */
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from "@angular/flex-layout";

//
import { HttpClientModule } from '@angular/common/http';

 
/*Componnetes */
import { PartidosComponent } from '../app/paginas/partidos/partidos.component';
import { CandidatosComponent } from '../app/paginas/candidatos/candidatos.component';
import { DetalleComponent } from '../app/paginas/detalle/detalle.component';
import { DetallePartidoIndicadoresComponent } from '../app/paginas/detalle-partido-indicadores/detalle-partido-indicadores.component';
import { PartidoAndinoComponent } from './paginas/detalle/partido-andino/partido-andino.component';
import { ListadoPresidenteComponent } from './paginas/detalle/listado-presidente/listado-presidente.component';
import { ListadoCongresistaComponent } from './paginas/detalle/listado-congresista/listado-congresista.component';
import { SharedModule } from './shared/shared.module';
import { CandidatoPresidenteComponent } from '../app/paginas/candidatos/candidato-presidente/candidato-presidente.component';
import { CandidatoCongresistaComponent } from '../app/paginas/candidatos/candidato-congresista/candidato-congresista.component';
import { CandidatoAndinoComponent } from '../app/paginas/candidatos/candidato-andino/candidato-andino.component';
@NgModule({
  declarations: [
    AppComponent,
    PartidosComponent,
    CandidatosComponent,
    DetalleComponent,
    DetallePartidoIndicadoresComponent,
    PartidoAndinoComponent,
    ListadoPresidenteComponent,
    ListadoCongresistaComponent,
    CandidatoPresidenteComponent,
    CandidatoCongresistaComponent,
    CandidatoAndinoComponent
  ],
  exports:[
    PartidosComponent,
    CandidatosComponent,
    DetalleComponent,
    DetallePartidoIndicadoresComponent,
    PartidoAndinoComponent,
    ListadoPresidenteComponent,
    ListadoCongresistaComponent,
    CandidatoPresidenteComponent,
    CandidatoCongresistaComponent,
    CandidatoAndinoComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule   ,
    MatTabsModule,
    MatListModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
