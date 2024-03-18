import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaRoutingModule } from './routers/consulta-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputMaskModule} from 'primeng/inputmask';
import { SelectButtonModule} from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RecaptchaModule } from 'ng-recaptcha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BusquedaDepositosComponent} from './components/busqueda-depositos/busqueda-depositos.component';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { StepperModule } from '../../shared/components/stepper/stepper.module';
import { DetalleDepositosComponent } from './components/detalle-depositos/detalle-depositos.component';

@NgModule({
  declarations: [
    BusquedaDepositosComponent,
    DetalleDepositosComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    SelectButtonModule,
    DropdownModule,
    ButtonModule,
    NavbarModule,
    FooterModule,
    StepperModule,
    RadioButtonModule,
    CalendarModule,
    DialogModule,
    TableModule,
    RecaptchaModule,
    FontAwesomeModule
  ]
})
export class ConsultaModule { }
