import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosComponent } from '../app/paginas/partidos/partidos.component';
import { DetalleComponent } from '../app/paginas/detalle/detalle.component';
import { CandidatosComponent } from '../app/paginas/candidatos/candidatos.component';

const routes: Routes = [
  { path: '',   redirectTo: '/partidos', pathMatch: 'full' }, 
  { path: 'partidos', component: PartidosComponent },
  { path: 'partido/:id', component: DetalleComponent},
  { path: 'candidatos', component: CandidatosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
