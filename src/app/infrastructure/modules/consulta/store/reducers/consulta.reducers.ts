import { createReducer, on } from "@ngrx/store";
import * as acciones from '../actions';
import * as estados from '../states';

const _cargarListaDepositos = createReducer(estados.cargarListaDepositosInit,
    on(acciones.cargarListaDepositos, (state, { lista }) => ({
        ...state,
        lista: lista
    }))
);

export function cargarListaDepositos(state:any, action:any) {
    return _cargarListaDepositos(state, action);
}

const _cargarDatosExpediente = createReducer(estados.cargarDatosExpedienteInit,
    on(acciones.cargarDatosExpediente, (state, { datosExpediente }) => ({
        ...state,
        datosExpediente: datosExpediente
    }))
);

export function cargarDatosExpediente(state:any, action:any) {
    return _cargarDatosExpediente(state, action);
}