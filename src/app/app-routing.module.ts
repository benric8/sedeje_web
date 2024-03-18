import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './infrastructure/shared/pages/page-not-found/page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'consulta', pathMatch: 'full' },
  { path: 'consulta', loadChildren: () => import('./infrastructure/modules/consulta/consulta.module').then(m => m.ConsultaModule)},
  { path: '**', component: PageNotFoundComponent, data: { title: 'Pagina no encontrada' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }