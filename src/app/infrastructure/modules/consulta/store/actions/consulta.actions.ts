import { createAction, props } from "@ngrx/store";
import { ListaDepositosModel } from '../../../../../domain/models/Depositos.model'
import { FiltroExpedienteModel } from "../../../../../domain/models/Expediente.model";

export const cargarListaDepositos = createAction(
    '[LayoutComponent] CARGAR LISTA DEPOSITOS',
    props<{ lista: ListaDepositosModel|null }>()
);

export const cargarDatosExpediente = createAction(
    '[LayoutComponent] CARGAR DATOS DE EXPEDIENTE',
    props<{ datosExpediente: FiltroExpedienteModel|null }>()
);