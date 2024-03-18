import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    DividerModule
  ], 
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
