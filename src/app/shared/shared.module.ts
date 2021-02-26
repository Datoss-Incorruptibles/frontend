import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatMenuModule} from '@angular/material/menu';

import { CardCandidatoComponent } from './_components/card-candidato/card-candidato.component';
import { AppRoutingModule } from './../app-routing.module';


@NgModule({
  declarations: [ CardCandidatoComponent],
  exports:[CardCandidatoComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
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
    MatMenuModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
