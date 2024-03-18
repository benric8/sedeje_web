import { OrdenPagoModel } from "./OrdenesPago.model"

export class DepositoModel {
    constructor(
        public codigoDeposito: string,
	    public estado: string,
	    public fechaRegistro: string,
	    public depositoEstados: DepositoEstadoModel[],
        public ordenesPago: OrdenPagoModel[]
    ){}
}

export class DepositoEstadoModel {
    constructor(
        public codigo: string,
	    public descripcionEstado: string,
	    public fechaOperacion: string,
	    public nivel: string,
		public activo: string
    ){}
}

export class ListaDepositosModel {
    constructor(
		public codigoExpediente: string,
	    public listadepositos: DepositoModel[]
    ){}
}

interface BaseResponse{
    codigo: string,
    descripcion: string,
    codigoOperacion: string
}

export interface BusquedaResponse extends BaseResponse{
    data: DepositoModel[]
}

export class StepDepositoModel{
	constructor(
        public title: string,
		public description: string,
		public select: boolean,
		public activo: boolean|null
    ){}
}

export class Usuario {
    constructor(
        public nombre: string
    ){}
}

