export class TokenModel {
    constructor(
      public token: string
    ){}
  }
  
  export interface TokenRefresh{
    token: string
  }

  export interface RefreshTokenResponse {
      codigo: string,
      descripcion: string,
      data: TokenRefresh,
      codigoOperacion: string
  }

  export interface tokenResponse {
    token: string,
    exps: number,
    refs: number
  }