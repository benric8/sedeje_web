// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Util } from './../assets/utils/util';

export const environment = {
  production: false,
  urlApi: Util.v1,
  tokenCaptcha:Util.v2,
  codigoCliente: Util.v3,
  codigoRol: Util.v4,
  usuarioConsumo: Util.v5,
  claveUsuarioConsumo: Util.v6,
  idGoogleAnalitics: Util.v7,
  urlConferenciaTerminos:Util.v8,
  urlConferenciaRegistro:Util.v9,
  urlConcursoBases:Util.v10,
  urlConcursoRegistro:Util.v11,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
