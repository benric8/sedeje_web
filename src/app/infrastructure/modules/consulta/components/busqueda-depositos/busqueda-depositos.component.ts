import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RecaptchaComponent,   } from 'ng-recaptcha';
import { TokenModel } from '../../../../../domain/models/Token.model';
import { BusquedaRequest } from 'src/app/domain/models/Maestras.model';
import { BusquedaResponse } from 'src/app/domain/models/Depositos.model';
import { AppSDJState } from '../../../../../infrastructure/global-store/sdj.reducers';
import Swal from 'sweetalert2';
import { constantes } from 'src/app/constants';
import { ListaDepositosModel } from 'src/app/domain/models/Depositos.model';
import { forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import * as actions from '../../../../../infrastructure/global-store/sdj.actions';

import { AuthService } from '../../../../../infrastructure/services/remote/autenticacion/auth.service';
import { ConsultaService } from '../../../../../infrastructure/services/remote/consulta/consulta.service';
import { ExpedienteResponse, FiltroExpedienteModel } from 'src/app/domain/models/Expediente.model';

@Component({
  selector: 'app-busqueda-depositos',
  templateUrl: './busqueda-depositos.component.html',
  styleUrls: ['./busqueda-depositos.component.scss']
})
export class BusquedaDepositosComponent implements OnInit {

  busqueda: BusquedaRequest={
              documentoIdentidad: "",
              fechaEmision: "",
              formatoExpediente: "",
              aplicaCaptcha: "S",
              tokenCaptcha: ""
            };

  listaDepositos: ListaDepositosModel;
  datosExpediente: FiltroExpedienteModel;

  //tiposDoc: any[]=[];
  //tipodocSeleccionado: string ="";

  //tipoFiltro: any[]=[];
  //filtroSeleccionado: any;

  codexpediente: string ="";

  numExpe: string = "";
  anioExp: string= "";
  incidente: string= "";
  sede: string= "";
  instancia: string= "";
  especialidad: string= "";
  secuencia: string= "";

  numDocumento: string = "";
  fechaEmision: Date | undefined;
  encontroDepositos: boolean = false;
  encontroDatosExp: boolean = false;
  //validaBusqDialog:boolean = false;
  //config captcha
  capchaKey: string = environment.tokenCaptcha;
  recaptcha:any = (window as any).grecaptcha;
  capchaLoad: boolean=false;
  tokenCapcha:string | null=null;
  tokenCapchaLast:string | null=null;
  errorCapcha:boolean=false;
  tokenLoad:boolean = false;

  @ViewChild('captchaElem', { static: false }) captchaElem: RecaptchaComponent | null = null;
 
  constructor(private store: Store<AppSDJState>, private authService: AuthService, private consultaService: ConsultaService,  private route: Router) {   
    this.listaDepositos ={codigoExpediente:"",listadepositos:[]};    
    this.datosExpediente = {
      numeroExpediente: '',
      nombreDistrito: '',
      proceso: '',
      materia: '',
      nombreJuzgado: '',
      juez: '',
      especialista: ''      
    };    
    // this.tiposDoc = [
    //   {name: 'DNI', code: '01'},
    //   {name: 'CARNET DE EXTRANJERIA', code: '02'},
    //   {name: 'PASAPORTE', code: '03'}
    // ];
    // this.tipoFiltro = [
    //   {name: 'Pendientes', code: '01'},
    //   {name: 'Cobrados', code: '02'}
    // ];
    this.authService.logoutSession();
    this.autenticate();
  }

  autenticate():void{
    this.tokenLoad = false;
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.authService.recuperarTokenAutorization().subscribe({
      next:(data:TokenModel)=>{
        console.log("data get autorization",data);
        this.authService.setToken(data.token);

      },
      complete:()=>{
        this.tokenLoad = true;
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err:any)=>{
        this.tokenLoad = true;
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
  }




  buscarDeposito():void {
    if(!this.tokenCapcha){
      Swal.fire('Atención!', 'Complete el CAPTCHA para poder realizar la búsqueda', 'warning');
      return;
    }
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    let tokenAut = this.authService.getToken();
    if(tokenAut){
      this.armarExpediente();
      this.busqueda.formatoExpediente = this.codexpediente;
      this.busqueda.aplicaCaptcha='N';
      this.busqueda.tokenCaptcha = this.tokenCapcha;
      this.busqueda.documentoIdentidad = this.numDocumento;

      this.encontroDepositos = false;
      this.encontroDatosExp = false;
      this.busqueda.fechaEmision = (this.fechaEmision!==undefined && this.fechaEmision!==null) ?this.fechaEmision.toLocaleDateString("en-GB") : '';
      if(this.codexpediente && this.codexpediente!==""){
        const bDepositos$ = this.consultaService.consultarDepositos({...this.busqueda});
        const bDatosEpexiente$ = this.consultaService.obtenerDatosExpediente(this.codexpediente);
        forkJoin([bDepositos$,bDatosEpexiente$]).subscribe({
          next:(resultResponses)=>{
            this.obtenerDepositos(resultResponses[0]);
            this.obtenerDatosExpediente(resultResponses[1]);   
          },
          complete:()=>{
              this.store.dispatch(actions.mostrarCargando({ estado: false}));
              if(this.encontroDatosExp == true && this.encontroDepositos == true){
                this.route.navigate(['/consulta/detalle-deposito']);
              }
          },
          error:(err)=>{
            this.store.dispatch(actions.mostrarCargando({ estado: false}));
            document.getElementById("cargando")?.classList.remove('show-loading');
            Swal.fire('Atención!', err, 'warning');
          }
        });
      } else{
        Swal.fire('Atención!', 'Complete un código de expediente para realizar la consulta.', 'warning');
        this.captchaElem?.reset();
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      }
    }
    else{
      Swal.fire('Atención!', 'Autorización requerida, inténtelo nuevamente.', 'warning');
      this.captchaElem?.reset();
      this.autenticate();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(actions.cargarListaDepositos({lista:null}));
  }

  pegar(e:any){
    e.preventDefault();
    let xFormatoExpe = e.clipboardData.getData('text/plain');
    if(xFormatoExpe != null && xFormatoExpe.length >= 20){
      let valores = xFormatoExpe.split("-");
      if(valores.length == 7) {
        this.numExpe = valores[0];
        this.anioExp = valores[1];
        this.incidente = valores[2];
        this.sede = valores[3];
        this.instancia = valores[4].toUpperCase();
        this.especialidad = valores[5].toUpperCase();
        this.secuencia = valores[6];
      } else {
        this.numExpe = "";
      }
    } else {
      this.numExpe = "";
    }
  } 

  armarExpediente():void{
    this.codexpediente="";
    this.codexpediente = this.codexpediente.concat(this.numExpe,"-",this.anioExp,"-",this.incidente,"-",this.sede,"-",this.instancia,"-",this.especialidad,"-",this.secuencia);
  }

  public resolved(captchaResponse: string): void {
    this.tokenCapcha = captchaResponse;
    this.tokenCapchaLast = captchaResponse;
  }

  check(event:any):void{
    event.target.value = event.target.value.toUpperCase();
  }

  obtenerDepositos(response:BusquedaResponse):void{
    if(response.codigo===constantes.RESPONSE_COD_EXITO){
      if(response.data.length>0){
        this.captchaElem?.reset();
        this.listaDepositos.listadepositos = response.data;
        this.listaDepositos.codigoExpediente = this.codexpediente;
        this.store.dispatch(actions.cargarListaDepositos({lista:{...this.listaDepositos}}));
        this.encontroDepositos = true;
      } else{
        this.captchaElem?.reset();
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', 'No se encontró depósitos judiciales electrónicos relacionados al expediente', 'info');
        this.encontroDepositos = false;
      }
    }
    else{
      this.captchaElem?.reset();
      this.store.dispatch(actions.mostrarCargando({ estado: false}));
      Swal.fire('Atención!', response.descripcion, 'info');
    }
  }

  obtenerDatosExpediente(response:ExpedienteResponse):void{
    if(response.codigo===constantes.RESPONSE_COD_EXITO){
      if(response.data!==null){
        this.datosExpediente = response.data;
        this.store.dispatch(actions.cargarDatosExpediente({datosExpediente:{...this.datosExpediente}}));
        this.encontroDatosExp = true;
      } else{
        this.captchaElem?.reset();
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', 'No se encontraron datos del expediente judicial', 'info');
        this.encontroDatosExp = false;
      }
    }
    else{
      this.captchaElem?.reset();
      this.store.dispatch(actions.mostrarCargando({ estado: false}));
      Swal.fire('Atención!', response.descripcion, 'info');
    }
  }

}
