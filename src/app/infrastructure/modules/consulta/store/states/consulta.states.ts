import { FiltroExpedienteModel } from '../../../../../domain/models/Expediente.model'
import { ListaDepositosModel } from '../../../../../domain/models/Depositos.model'

export interface cargarListaDepositos {
    lista: ListaDepositosModel | null
}

export interface cargarDatosExpediente {
    datosExpediente: FiltroExpedienteModel | null
}