import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosComponent } from '../app/paginas/partidos/partidos.component';
import { DetalleComponent } from './paginas/partido-detalle/detalle.component';
import { CandidatosComponent } from '../app/paginas/candidatos/candidatos.component';
import { CandidatoDetalleComponent } from '../app/paginas/candidato-detalle/candidato-detalle.component';
import { MilistaComponent } from "./paginas/milista/milista.component";

const routes: Routes = [
  { path: '',   redirectTo: '/partidos', pathMatch: 'full' }, 
  { path: 'partidos', component: PartidosComponent },
  { path: 'partido/:id', component: DetalleComponent},
  { path: 'candidatos', component: CandidatosComponent },
  { path: 'candidato/:id', component: CandidatoDetalleComponent },
  { path: 'milista', component: MilistaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
