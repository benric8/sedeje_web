import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as acciones from '../actions';
//import { PublicService } from '../../core/services/public.service';
@Injectable()
export class PublicEffects {
    constructor(
        private actions$: Actions,
        //private publicServices: PublicService
    ){}
//
//    /**
//     * Efectos para recuperar evento
//     */
//    getEvento$ = createEffect(() => this.actions$.pipe(
//        ofType(acciones.cargarEvento),
//        mergeMap(
//             (param) => this.publicServices.getEvento(param.filtro).pipe( /* Ejecuta método del servicio */
//                 map(result => acciones.cargarEventoSuccess({ data: result })), /* Si operacion esta OK */
//                 catchError(error => of(acciones.cargarEventoError({ error: error }))) /* Si operación error */
//             )
//         )
//     ));
//
//    /**
//     * Efectos para recuperar imagene slider
//     */
//    getSlider$ = createEffect(() => this.actions$.pipe(
//        ofType(acciones.cargarSlider),
//        mergeMap(
//             (param) => this.publicServices.getContenidoVisual(param.filtro).pipe( /* Ejecuta método del servicio */
//                 map(result => acciones.cargarSliderSuccess({ data: result })), /* Si operacion esta OK */
//                 catchError(error => of(acciones.cargarSliderError({ error: error }))) /* Si operación error */
//             )
//         )
//     ));
//    /**
//     * Efectos para recuperar logos
//     */
//    getLogos$ = createEffect(() => this.actions$.pipe(
//        ofType(acciones.cargarLogos),
//        mergeMap(
//             (param) => this.publicServices.getContenidoVisual(param.filtro).pipe( /* Ejecuta método del servicio */
//                 map(result => acciones.cargarLogosSuccess({ data: result })), /* Si operacion esta OK */
//                 catchError(error => of(acciones.cargarLogosError({ error: error }))) /* Si operación error */
//             )
//         )
//     ));
//    /**
//     * Efectos para recuperar evento
//     */
//    getAcercaDe$ = createEffect(() => this.actions$.pipe(
//        ofType(acciones.cargarAcercaDe),
//        mergeMap(
//             (param) => this.publicServices.getContenidoVisual(param.filtro).pipe( /* Ejecuta método del servicio */
//                 map(result => acciones.cargarAcercaDeSuccess({ data: result })), /* Si operacion esta OK */
//                 catchError(error => of(acciones.cargarAcercaDeError({ error: error }))) /* Si operación error */
//             )
//         )
//     ));
}