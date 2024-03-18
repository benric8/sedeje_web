import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
//import { OpcionSistema } from 'src/app/pages/admin/core/models/OpcionesResponse.model';

@Component({
  selector: 'app-menu-opcion',
  templateUrl: './menu-opcion.component.html',
  styleUrls: ['./menu-opcion.component.scss']
})
export class MenuOpcionComponent implements OnInit {
  @Input() menuRaiz:boolean = true;
  @Input() menuMin:boolean = false;
  @Input() mobile:boolean = false;
  @Output() menuClickEvent = new EventEmitter();
  @Output() menuIndexEvent = new EventEmitter();
  @Output() menuActivarEvent = new EventEmitter();

  //@Input() listaOpciones: OpcionSistema[] =[]; //lista de opciones padres o hijos
  @Input() listaOpciones: any[] =[]; //lista de opciones padres o hijos

  @Input() submenoAbierto:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  goRoute(/*item:OpcionSistema*/ item:any):void{
    //this.store.dispatch(actions.seleccionarOpcionMenuIndice({indice:indice}));
    //console.log(indice);
    //console.log("menu opcion ",item);
    if(item.hijos.length >0){
      //this.submenoAbierto = !this.submenoAbierto;
      this.menuActivarEvent.emit(item.id);
      //console.log(" id hijo seleccionado ",item.id);
    }
    else{
      this.menuIndexEvent.emit(item.id);
      //this.menuClickEvent.emit(true);
    }
  }

  goRouteHijos(id:number):void{
    this.menuIndexEvent.emit(id);
  }

  clickEventHijos(){
    this.menuClickEvent.emit(true);
  }
  clickActivarEvent(id:number){
    //console.log(" id padre seleccionado ",id);
    this.menuActivarEvent.emit(id);
  }
}
