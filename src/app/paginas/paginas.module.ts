import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { CandidatoNomepresentaComponent } from './candidato-nomepresenta/candidato-nomepresenta.component';



@NgModule({
  declarations: [AcercaDeComponent, CandidatoNomepresentaComponent],
  imports: [
    CommonModule
  ]
})
export class PaginasModule { }
