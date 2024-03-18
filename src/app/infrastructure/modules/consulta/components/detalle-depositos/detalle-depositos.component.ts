import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppSDJState } from 'src/app/infrastructure/global-store/sdj.reducers';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { DepositoModel,DepositoEstadoModel,StepDepositoModel } from 'src/app/domain/models/Depositos.model';
import { ListaOrdenesPagoResponse, OrdenPagoModel } from 'src/app/domain/models/OrdenesPago.model';
import { ConsultaService } from 'src/app/infrastructure/services/remote/consulta/consulta.service';
import { constantes } from 'src/app/constants';
import { faLeftLong, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-depositos',
  templateUrl: './detalle-depositos.component.html',
  styleUrls: ['./detalle-depositos.component.scss']
})
export class DetalleDepositosComponent implements OnInit, OnDestroy {

  suscripcion: Subscription = new Subscription();

  listaOrigenDepositos:DepositoModel[]=[];
  listaDepositos:DepositoModel[]=[];
  depEstadosSeleccionado:DepositoEstadoModel[]=[];
  stepDepositosSelect:StepDepositoModel[]=[];
  listaOrdenes: OrdenPagoModel[];
  faPrint = faPrint;
  faLeftLong = faLeftLong;
  codexpediente: string;
  nombreJuez: string;
  nombreEspecialista: string;
  materia: string;
  nombreDistrito: string;
  nombreJuzgado: string;
  proceso: string;

  constructor(private route: Router, private activatedRoute: ActivatedRoute,private consultaService: ConsultaService, private store: Store<AppSDJState>) {    
    this.codexpediente='';
    this.nombreJuez='';
    this.nombreEspecialista='';
    this.materia='';
    this.nombreDistrito='';
    this.nombreJuzgado='';
    this.proceso='';    
    // this.tipoFiltro = [
    //   {code: '1', name: 'Pendientes'},
    //   {code: '2', name: 'Finalizados'}
    // ];
    this.listaOrdenes = [];
  }

  ngOnInit(): void {
    this.listaOrigenDepositos = [];
    this.listaDepositos = [];
    this.listaOrdenes = [];
    this.codexpediente = "";
    this.suscripcion = this.store.select('cargarListaDepositos').subscribe(({lista}) => {
      if(lista){
        this.codexpediente = lista.codigoExpediente ;
        this.listaOrigenDepositos = lista.listadepositos;
        this.depEstadosSeleccionado = this.listaOrigenDepositos[0].depositoEstados;
        this.listaOrdenes = this.listaOrigenDepositos[0].ordenesPago;
        this.listaDepositos = this.listaOrigenDepositos;
        //this.cargarPorFiltro();
      } else{
        Swal.fire('Atención!', 'No se encontró depositos relacionados al expediente', 'info');
        this.route.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    });
    this.suscripcion = this.store.select('cargarDatosExpediente').subscribe(({datosExpediente}) => {
      if(datosExpediente){
        this.nombreEspecialista = datosExpediente.especialista  ;
        this.nombreJuez = datosExpediente.juez;
        this.materia = datosExpediente.materia;
        this.nombreDistrito = datosExpediente.nombreDistrito;
        this.nombreJuzgado = datosExpediente.nombreJuzgado;
        this.proceso = datosExpediente.proceso;
      } 
    });    
  }

  // cargarPorFiltro():void{
  //   this.listaDepositos = this.listaOrigenDepositos;
  //   if (this.filtroSeleccionado==='1') {
  //     this.listaDepositos = this.listaDepositos.filter(item => item.estado === 'P');
  //     this.depEstadosSeleccionado = this.listaDepositos[0].depositoEstados;
  //   } else {
  //     this.listaDepositos = this.listaDepositos.filter(item => item.estado !== 'P');
  //     this.depEstadosSeleccionado = this.listaDepositos[0].depositoEstados;
  //   }
  // }

  cargarDepositoSeleccionado(depositoEstados:DepositoEstadoModel[]):StepDepositoModel[]{
    if(depositoEstados!==undefined && depositoEstados!==null && depositoEstados.length>0){
      this.stepDepositosSelect = [];
      depositoEstados.forEach(element => {
        this.stepDepositosSelect.push({
              title: element.descripcionEstado,
              description: element.fechaOperacion,
              activo: element.activo!=='1'?false:true,
              select : false
        });
      });
    }
    return this.stepDepositosSelect;
  }

  // obtenerListaOrdenes(codigoDeposito : string):OrdenPagoModel[]{
  //   console.log("prueba de rowexpand : ",codigoDeposito);
  //   // this.consultaService.obtenerOrdenesPago(codigoDeposito).subscribe({
  //   //   next:(data:ListaOrdenesPagoResponse)=>{
  //   //     console.log("consulta Ordenes",data);
  //   //     if(data.codigo===constantes.RESPONSE_COD_EXITO){
  //   //       this.listaOrdenes = data.data;
  //   //     }else{
  //   //       Swal.fire('Atención!', data.descripcion, 'info');
  //   //     } 
  //   //   },
  //   //   complete:()=>{
  //   //   },
  //   //   error:(err)=>{
  //   //     Swal.fire('Atención!', err, 'warning');
  //   //   }
  //   // });
  //   return this.listaOrdenes;
  // }

  volverInicio(){
    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  imprimirRegistro():void{
    let prtContent = document.getElementById("panel-impresion");
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head>
          <title>Contenido para imprimir</title>
          <style>
            td{
              vertical-align: top;
              padding: 4px 16px;
              line-height: 1.42857143;
            }
            table {
              border-collapse: collapse;
            }
            tr{
              border: 1px solid #333;
            }
            .font-semibold{
              font-weight: 600;
            }   
            
          .panel-print{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .vertical-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              row-gap: 10px;
          }
          
          .container {
              display: flex;
          }
          
          .width_porc66{
              width: 86%;
          }
          
          .width_porc96{
              width: 100% !important;
          }
          
          .titulo {
              font-weight: 600;
          }

          .container-info{
              width: 100%;
              display: flex;
              flex-direction: row;
              column-gap: 15px;
              margin: 10px;
          }
          
          .info{
              width: 100%;
              display: flex;
              flex-direction: column;
          }
          
          .info-sm{
              width: 41%;
              display: flex;
              flex-direction: column;
              align-items: left;
          }
          
          
          .text-info{
              text-align: left;
              color: darkred;
              width: 50%;
          }
          
          .text-resultado{
              text-align: left;
              align-self: center;
              width: 100%;
              font-size: small;
          }
          
          .row-resultado{
              text-align: left;
              margin: 7px 0 7px 0;
              display: flex;
              flex-direction: row;
              column-gap: 10px;
          }
          
          .tabla-detalle{
              width: 100%;
          }
          
          ::ng-deep .tabla-detalle .p-datatable-tbody > tr:nth-child(even) {
            background: #f7f7f7;
          }
          
          .tabla-orden{
              width: 100%;
              border: 1px solid #0f1530 !important
          }
          
          ::ng-deep .tabla-orden .p-datatable .p-datatable-thead > tr > th {
              color: #ffffff;
              background: #9f1010;
          }
          
          ::ng-deep .tabla-orden .p-datatable .p-datatable-tbody > tr > td{
              border: 1px solid #d5d5d5 !important
          }
          
          ::ng-deep .tabla-orden .p-datatable-tbody > tr:nth-child(even) {
            background: #f2f5fa;
          }
          
          .p-datatable-header{
              height: 50px;
          }
          
          .stepper {
            counter-reset: step;
            display: flex;
            justify-content: space-between;
            padding: 0px;
        }
        .stepper li{
            list-style-type: none;
            float: left;
            width: 100%;
            position:relative;
            text-align: center;
            font-weight: 500;
        }
        .stepper li:before {
            content: url("./../../../../../../assets/img/check-icon.svg");
            counter-increment: step;
            position: relative;
            height:30px;
            width:30px;
            line-height: 30px;
            border: 2px solid transparent;
            box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.1), 0px 4px 5px -2px rgba(0, 0, 0, 0.12), 0px 10px 15px -5px rgba(0, 0, 0, 0.2);
            display:block;
            border-radius: 10%;
            text-align: center;
            margin: 0 auto 10px auto;
            background-color: white;
            z-index: 2;
        }
        .stepper li:after {
            content:'';
            position: absolute;
            width:100%;
            height:2px;
            background-color: #ddd;
            top: 15px;
            left: -50%;
            z-index: 1;
        }
        .stepper li:first-child:after {
            content:none;
        }
        .stepper li.active {
            color:rgb(31, 119, 35);
        }
        .stepper li.select:before {
            border-color:rgb(31, 119, 35);
            background-color: white;
            color: rgb(31, 119, 35);
        }
        .stepper li.active:before {
            border-color:rgb(31, 119, 35);
            background-color: rgb(31, 119, 35);
            color: white;
        }
        .stepper li.active + li:after{
            background-color:rgb(31, 119, 35);
        }
        .stepper-v {
            counter-reset: step;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0px;
        }
        .stepper-v li {
            position: relative;
            min-height: 0.4em;
            list-style-type: none;
            font-weight: 600;
            float: left;
        }
        
        .stepper-v li + li{
            margin-top: 1.8em
        }
        
        .stepper-v li:before{
            counter-increment: step;
            content: url("./../../../../../../assets/img/check-icon.svg");
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            border-radius: 100%;
            text-align: center;
            border: 2px solid #787878;
            background-color: #ddd;
            display:block;
            border-radius: 10%;
            margin-right: 5px;
            z-index: 2;
        }
        .stepper-v li:after {
            content: '';
            position: absolute;
            top: 1px;
            bottom: 1px;
            left: 15px;
            height: 100%;
            width: 2px;
            transform: scale(1, 1.5);
            transform-origin: 50% -100%;
            background-color: #ddd;
            z-index: 3;
          }
        .stepper-v li:last-child:after {
            content:none;
        }
        .stepper-v li.active{
            color:rgb(31, 119, 35);
        }
        .stepper-v li.select:before{
            border-color: rgb(31, 119, 35);
            background-color: white;
            color: rgb(31, 119, 35);
        }   
        .stepper-v li.active:before{
            border-color: rgb(31, 119, 35);
            background-color: rgb(31, 119, 35);
            color:white;
        }
        .stepper-v .active:after{
            background-color: rgb(31, 119, 35);
        }
        .stepper-v li div{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .step-title{
            font-size: 14px;
        }
        .step-description{
            font-size: 12px;
            color: #888888;
        }

        .paginator-resultado{
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .p-paginator {
          background: transparent;
          padding: 0.5rem 1rem;
        }
        
        .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
          color: #fff;
        }
        
        .p-paginator .p-paginator-pages .p-paginator-page {
          color: #000;
          border-radius: 50%;
          min-width: 2rem;
          height: 2rem;
        }
        
        .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
          color: #fff;
        }
        
        .p-paginator .p-paginator-first, .p-paginator .p-paginator-prev, .p-paginator .p-paginator-next, .p-paginator .p-paginator-last {
          min-width: 2rem ;
          height: 2rem ;
          border-radius: 50% ;
        }
        .total-paginas{
          font-size: 13px;
        }

          </style>
        </head>
        <body>
          ${prtContent?.innerHTML}
        </body>
      </html>
    `);
    
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  }
}