import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { BusquedaRequest } from 'src/app/domain/models/Maestras.model';
import { ExpedienteResponse } from 'src/app/domain/models/Expediente.model';
import { environment } from 'src/environments/environment';
import { BusquedaResponse } from 'src/app/domain/models/Depositos.model';
import { ListaOrdenesPagoResponse } from 'src/app/domain/models/OrdenesPago.model';

@Injectable({
    providedIn: 'root'
  })
  export class ConsultaService {
    public readonly LISTA_DEPOSITOS = "LST_SDJ";

    constructor(private httpClient: HttpClient,private route: Router/* , private authService: AuthService */) { }

    consultarDepositos(busqueda: BusquedaRequest) {
        let newDAte:Date = new Date();
        return this.httpClient.post(`${ environment.urlApi }consulta/depositosJudiciales`, busqueda).pipe(
            map((result: any) => {
            let busquedaResponse:BusquedaResponse = result;
            if(busquedaResponse.codigo==='0000'){
                console.log("Consulta Exitosa");
                //this.authService.setDatetimeNewToken(newDAte);
            }
            return result;
            }),
            catchError(this.handleError)
        );
    }

    obtenerDatosExpediente(expediente: String) {
        let newDAte:Date = new Date();
        return this.httpClient.get(`${ environment.urlApi }consultaWS/expedientes?xformato=${expediente}`).pipe(
            map((result: any) => {
            let expedienteResponse:ExpedienteResponse = result;
            if(expedienteResponse.codigo==='0000'){
                console.log("Consulta Exitosa");
                //this.authService.setDatetimeNewToken(newDAte);
            }
            return result;
            }),
            catchError(this.handleError)
        );
    }

    obtenerOrdenesPago(codeDeposito: String) {
        let newDAte:Date = new Date();
        return this.httpClient.get(`${ environment.urlApi }consulta/depositosJudiciales/ordenesPago?codigoDeposito=${codeDeposito}`).pipe(
            map((result: any) => {
            let listaOrdenesResponse:ListaOrdenesPagoResponse = result;
            if(listaOrdenesResponse.codigo==='0000'){
                console.log("Consulta Exitosa");
                //this.authService.setDatetimeNewToken(newDAte);
            }
            return result;
            }),
            catchError(this.handleError)
        );
    }    

    handleError(err: HttpErrorResponse): Observable<never> {
        console.log("Error services ",err);
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
        errorMessage = err.error.message;
        } else {
            if(!err.status){
            return throwError(() => {
                return err;
            });
            }
            if(err.status === 401 || err.status === 403){
            errorMessage = 'Error en autenticación, intente ingresar al sistema nuevamente';
            }else{
            errorMessage = `Error: ${err.status}\n Mensaje: ${err.message}`;
            }
        }
        //console.log(errorMessage);
        return throwError(() => {
        return errorMessage;
        });
    }

    // setListaDepLocal(listaDep: any) {
    //     localStorage.setItem(this.LISTA_DEPOSITOS, JSON.stringify(listaDep))
    // }
    // getListaDepLocal() {
    //     let listaDepLocal:string|null =localStorage.getItem(this.LISTA_DEPOSITOS); 
    //     if(listaDepLocal) {
    //         return JSON.parse(listaDepLocal);
    //     } else {
    //         return null;
    //     }
    // }
    // removeListaDepLocal() {
    //     localStorage.removeItem(this.LISTA_DEPOSITOS);
    // }

}