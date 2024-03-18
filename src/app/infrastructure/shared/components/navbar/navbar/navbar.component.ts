import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {  faUser , faUserTie, faUserShield ,faUserCog } from '@fortawesome/free-solid-svg-icons';
//import { LoginService } from '../../../admin/core/services/login.service';
//import { Usuario } from 'src/app/pages/admin/core/models/LoginResponse.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Input() profile:boolean = false;
  @Output() sidebarEvent = new EventEmitter();
  @Output() drawableEvent = new EventEmitter();

  sidebarShow:boolean = false;
  drawableShow:boolean = false;

  itemsEnd: MenuItem[]=[];
  nomUsuario: string;
  correoUsuario:string;
  perfilUsuario:string;
  title:string ="";
  faUser = faUser;
  faUserTie = faUserTie;
  faUserShield = faUserShield;
  faUserCog = faUserCog;
  
  dataUsuario:any;
  dataPerfil:any;
  constructor(/*private loginService: LoginService*/) { 
    //this.dataUsuario = this.loginService.getUsuario();
    this.dataPerfil = null;
    //this.dataUsuario = this.loginService.getUsuario();
    this.dataPerfil = null;
    this.nomUsuario = '';
    this.correoUsuario = '';
    this.perfilUsuario = '';
  }

  ngOnInit(): void {
    //console.log(this.dataUsuario);
    this.itemsEnd = [
      {
        separator:true
      },
      /*{
          label:'Canbiar contraseña',
          icon:'pi pi-lock',
          styleClass:"menu-profile-item p-ripple",
          routerLink: ['/cumbre/autenticacion/cambiar-contrasenia'],
          routerLinkActiveOptions: { exact: true },
      },
      {
        separator:true
      },*/
      {
          label:'Salir',
          icon:'pi pi-sign-out',
          styleClass:"menu-profile-item p-ripple",
          routerLink: ['/cumbre/autenticacion/login'],
          routerLinkActiveOptions: { exact: true },
          
      }            
    ];
  }
  toggleSidebar(event:any):void{
    //console.log(console.log(event));
    this.sidebarShow = !this.sidebarShow;
    this.sidebarEvent.emit(this.sidebarShow);
  }
  
  toggleDrawable(event:any):void{
    //console.log(console.log(event));
    //this.drawableShow = !this.drawableShow;
    this.drawableEvent.emit(true);
  }

}
