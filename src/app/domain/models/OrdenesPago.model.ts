export class OrdenPagoModel {
    constructor(
        public codigoEstado: string,
        public fechaEndoso: string,
        public fechaCobro: string,
        public cdepositoJ: string,
        public cordenPago: string
    ){}
}

interface BaseResponse{
    codigo: string,
    descripcion: string,
    codigoOperacion: string
}

export interface ListaOrdenesPagoResponse extends BaseResponse{
    data: OrdenPagoModel[]
}