import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuOpcionComponent } from './menu-opcion/menu-opcion.component';


@NgModule({
  declarations: [
    MenuComponent,
    MenuOpcionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
