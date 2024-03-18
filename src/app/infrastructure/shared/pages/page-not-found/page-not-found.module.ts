import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ], exports:[
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule { }
