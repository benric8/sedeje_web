export class FiltroExpedienteModel {
    constructor(
		public numeroExpediente: string,
		public nombreDistrito: string,
		public proceso: string,
		public materia: string,
		public nombreJuzgado: string,
		public juez: string,
        public especialista: string
		// public nombreEspecialidad: string|null,
		// public nombreInstancia: string|null,
        // public nombreProvincia: string|null,
		// public nombreDependencia: string|null,
        // public nombreDependenciaProvincia: string|null,
        // public nombreDependenciaDistrito: string|null,
        // public descripcionSede: string|null,
		// public numeroIncidente: number|null,
        // public numeroUnico: number|null,
        // public codConexion: string|null,
        // public codigoMensaje: string|null,
        // public fecha: string|null,
        // public fechaIngreso: string|null
    ){}
}

interface BaseResponse{
    codigo: string,
    descripcion: string,
    codigoOperacion: string
}

export interface ExpedienteResponse extends BaseResponse{
    data: FiltroExpedienteModel
}

