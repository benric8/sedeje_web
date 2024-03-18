import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BusquedaDepositosComponent} from '../components/busqueda-depositos/busqueda-depositos.component'
import { DetalleDepositosComponent } from '../components/detalle-depositos/detalle-depositos.component';
import { PageNotFoundComponent } from 'src/app/infrastructure/shared/pages/page-not-found/page-not-found/page-not-found.component';
const routes: Routes = [
      { path: '', redirectTo: 'buscar-deposito', pathMatch: 'full' },
      { path: 'buscar-deposito', component: BusquedaDepositosComponent, data: { title: 'Búsqueda Depósitos Judiciales' }},
      { path: 'detalle-deposito', component: DetalleDepositosComponent, data: { title: 'Detalle Depósito Judicial' }},
      { path: '**', component: PageNotFoundComponent, data: { title: 'Pagina no encontrada' }}      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
