import {ActionReducerMap} from "@ngrx/store";

import * as reducersGeneral from './general/reducers';
import * as statesGeneral from './general/states/general.states';

//----------- reducers ----------
import * as reducersConsulta from '../modules/consulta/store/reducers';
//------------ states -----------
import * as statesConsulta from '../modules/consulta/store/states/consulta.states';


export interface AppSDJState {
    //--- general
    mostrartituloNavBar: statesGeneral.mostrartituloNavBar,
    mostrarCargando: statesGeneral.mostrarCargando,
    //--- consulta
    cargarListaDepositos: statesConsulta.cargarListaDepositos,
    cargarDatosExpediente: statesConsulta.cargarDatosExpediente
}

export const appSDJReducers: ActionReducerMap<AppSDJState> = {
    //--- general
    mostrartituloNavBar: reducersGeneral.mostrarTituloNavBar,
    mostrarCargando: reducersGeneral.mostrarCargando ,
    //--- admin
    cargarListaDepositos: reducersConsulta.cargarListaDepositos,
    cargarDatosExpediente: reducersConsulta.cargarDatosExpediente
}