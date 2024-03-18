import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    OverlayPanelModule,
    MenuModule,
    ButtonModule,
    FontAwesomeModule,
    RippleModule    
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
