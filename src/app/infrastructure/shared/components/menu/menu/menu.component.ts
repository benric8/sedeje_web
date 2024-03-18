import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuMin:boolean = false;
  @Input() mobile:boolean = false;
  @Output() menuClickEvent = new EventEmitter();
  @Output() menuIndexEvent = new EventEmitter();
  @Output() menuActivarEvent = new EventEmitter();

  @Input() listaOpciones: any[] =[];

  constructor() { }

  ngOnInit(): void {
  }
  goRoute(indice:number):void{
    //this.store.dispatch(actions.seleccionarOpcionMenuIndice({indice:indice}));
    //console.log(indice);
    this.menuClickEvent.emit(true);
    this.menuIndexEvent.emit(indice);
  }
  clickActivarEvent(id:number){
    //console.log("emit recibido y enviado ",id);
    this.menuActivarEvent.emit(id);

  }

}
