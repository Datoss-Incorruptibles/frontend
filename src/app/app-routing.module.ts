import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosComponent } from '../app/paginas/partidos/partidos.component';
import { DetalleComponent } from './paginas/partido-detalle/detalle.component';
import { CandidatosComponent } from '../app/paginas/candidatos/candidatos.component';
import { CandidatoDetalleComponent } from '../app/paginas/candidato-detalle/candidato-detalle.component';
import { MilistaComponent } from "./paginas/milista/milista.component";
import { PageNotFoundComponent } from "./paginas/page-not-found/page-not-found.component";
import { PlanesGobiernoComponent } from "./paginas/planes-gobierno/planes-gobierno.component";
import { AcercaDeComponent } from "./paginas/acerca-de/acerca-de.component";
import { ComoVotarComponent } from './paginas/como-votar/como-votar.component';
import { AyudaComponent } from './paginas/ayuda/ayuda.component';
import { CandidatoNomepresentaComponent } from "./paginas/candidato-nomepresenta/candidato-nomepresenta.component";
import { CandidatoSimerepresentaComponent } from "./paginas/candidato-simerepresenta/candidato-simerepresenta.component";
import { QuizComponent } from "./paginas/quiz/quiz.component";

const routes: Routes = [
  { path: '',   redirectTo: 'quiz/.', pathMatch: 'full' }, 
  { path: 'partidos/.', component: PartidosComponent },
  { path: 'partido/:id/.', component: DetalleComponent},
  { path: 'candidatos/.', component: CandidatosComponent },
  { path: 'candidato/:id/.', component: CandidatoDetalleComponent },
  { path: 'candidato/:id/nomerepresenta/.', component: CandidatoNomepresentaComponent },
  { path: 'candidato/:id/simerepresenta/.', component: CandidatoSimerepresentaComponent },
  { path: 'milista/.', component: MilistaComponent },
  { path: 'acercade/.', component: AcercaDeComponent },
  { path: 'comovotar/.', component: ComoVotarComponent },
  { path: 'ayuda/.', component: AyudaComponent },
  { path: 'planesdegobierno/.', component: PlanesGobiernoComponent },
  { path: 'quiz/.', component: QuizComponent },
  { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
