import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() tipo: string="h";// v
  @Input() steps: any[] =[];
  /*@Input() lista: any[] = [
   {title:"primero",description:"una descripcion",activo:true, select:false},
   {title:"segundo",description:"una descripcion segundo",activo:false, select:true},
   {title:"tercero",description:"una descripcion segundo",activo:false, select:false}
  ];*/
  
  constructor() { }

  ngOnInit(): void {
  }

}
