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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';

//
import { HttpClientModule } from '@angular/common/http';

 
/*Componnetes */
import { PartidosComponent } from '../app/paginas/partidos/partidos.component';
import { DetalleComponent } from '../app/paginas/detalle/detalle.component';
import { DetallePartidoIndicadoresComponent } from './paginas/detalle-partido-indicadores/detalle-partido-indicadores.component';
import { PartidoAndinoComponent } from './paginas/detalle/partido-andino/partido-andino.component';
import { ListadoPresidenteComponent } from './paginas/detalle/listado-presidente/listado-presidente.component';
import { ListadoCongresistaComponent } from './paginas/detalle/listado-congresista/listado-congresista.component';
import { SharedModule } from './shared/shared.module';
import { HistoriaPartidoComponent } from './paginas/detalle/historia-partido/historia-partido.component';

/*Componentes Candidato */
import { CandidatosComponent } from '../app/paginas/candidatos/candidatos.component';
import { CandidatoDetalleComponent } from '../app/paginas/candidato-detalle/candidato-detalle.component';
import { CandidatoHistoriaComponent } from '../app/paginas/candidato-detalle/candidato-historia/candidato-historia.component'

/*Mi lista  */
import { MilistaComponent } from '../app/paginas/milista/milista.component';

/*Utils */
import {ScrollingModule} from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { CandidatoPresidenteComponent } from '../app/paginas/candidatos/candidato-presidente/candidato-presidente.component';
import { CandidatoCongresistaComponent } from '../app/paginas/candidatos/candidato-congresista/candidato-congresista.component';
import { CandidatoAndinoComponent } from '../app/paginas/candidatos/candidato-andino/candidato-andino.component';
@NgModule({
  declarations: [
    AppComponent,
    PartidosComponent,
    DetalleComponent,
    DetallePartidoIndicadoresComponent,
    PartidoAndinoComponent,
    ListadoPresidenteComponent,
    ListadoCongresistaComponent,
    HistoriaPartidoComponent,

/*Componentes Candidato */
    CandidatosComponent,
    CandidatoPresidenteComponent,
    CandidatoCongresistaComponent,
    CandidatoAndinoComponent,
    CandidatoDetalleComponent,
    CandidatoHistoriaComponent,
    MilistaComponent
  ],
  exports:[
    PartidosComponent,
    DetalleComponent,
    DetallePartidoIndicadoresComponent,
    PartidoAndinoComponent,
    ListadoPresidenteComponent,
    ListadoCongresistaComponent,
    HistoriaPartidoComponent,

    /*Componentes Candidato */
    CandidatosComponent,
    CandidatoPresidenteComponent,
    CandidatoCongresistaComponent,
    CandidatoAndinoComponent,
    CandidatoDetalleComponent,
    MilistaComponent

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
    MatProgressBarModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    SharedModule,
    ScrollingModule,
    InfiniteScrollModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
