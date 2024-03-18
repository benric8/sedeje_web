import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { constantes } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly JWT_TOKEN = constantes.JWT_TOKEN;
  public readonly TOKEN_LEVEL = constantes.TOKEN_LEVEL;
  public readonly TOKEN_VALID_SEC = constantes.TOKEN_VALID_SEC;
  public readonly REFRESH_TOKEN_VALID_SEC = constantes.REFRESH_TOKEN_VALID_SEC;
  public readonly DATETIME_NEW_TOKEN = constantes.DATETIME_NEW_TOKEN;

  constructor(private httpClient: HttpClient) { }

  recuperarTokenAutorization () {
    let newDAte:Date = new Date();
    return  this.httpClient.post(`${ environment.urlApi }api/authenticate`,  null, {
      headers: new HttpHeaders({'username': environment.usuarioConsumo , 'password': environment.claveUsuarioConsumo, 'codigoCliente':  environment.codigoCliente, 'codigoRol': environment.codigoRol}),
      responseType: "json"
      }).pipe(
      map((result:any) => {
        this.setDatetimeNewToken(newDAte);
        this.setTokenLevel(constantes.TOK_LVL_AUTH);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  refreshToken (token: any) {
    return this.httpClient.get(`${ environment.urlApi }seguridad/refresh?token=${token}`).pipe(
        map((result:any) => result),
        catchError(err => {
            //Swal.fire('Atención!', 'Sesión finalizada, ingrese nuevamente.', 'info');
            return throwError(() => err);
          })
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    //console.log("Error services ",err);
    let errorMessage = '';
    if(!err.status){
      return throwError(() => {
        return err;
      });
    }
    
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error codigo:${err.status} \n Mensaje: ${err.message}`;
    }
    //console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
    //return throwError(() => err);
  }

  setToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  
  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
  //---
  setTimeTokenValido(exp: number) {
    localStorage.setItem(this.TOKEN_VALID_SEC, exp.toString());
  }
  
  getTimeTokenValido():number {
    let exp: string|null = localStorage.getItem(this.TOKEN_VALID_SEC);
    return exp ? +exp:-1;
  }
  //----
  setTimeRefreshValido(ref: number) {
    localStorage.setItem(this.REFRESH_TOKEN_VALID_SEC, ref.toString());
  }
  
  getTimeRefreshValido():number {
    let ref: string|null = localStorage.getItem(this.REFRESH_TOKEN_VALID_SEC);
    return ref ? +ref:-1;
  }

  removeTimes() {
    localStorage.removeItem(this.TOKEN_VALID_SEC);
    localStorage.removeItem(this.REFRESH_TOKEN_VALID_SEC);
  }
  //-----
  setDatetimeNewToken(time: Date) {
    localStorage.setItem(this.DATETIME_NEW_TOKEN, time.toString());
  }
  
  getDatetimeNewToken():string {
    let data:string|null = localStorage.getItem(this.DATETIME_NEW_TOKEN);
    return data?data:"";
  }
  //---
  setTokenLevel(tokenLevel: string) {
    localStorage.setItem(this.TOKEN_LEVEL, tokenLevel);
  }
  
  getTokenLevel():string {
    let dataLvl:string|null = localStorage.getItem(this.TOKEN_LEVEL);
    return dataLvl?dataLvl:"";
  }

  removeTokenLevel() {
    localStorage.removeItem(this.TOKEN_LEVEL);
  }
  //---
  logoutSession() {
    localStorage.clear();
  }

  getDiffTimeSession():number{
    try{
      let dateTimeNewToken:string = this.getDatetimeNewToken();
      if(dateTimeNewToken.trim()===""){
        return -1;
      }
      let sessionInit:Date = new Date(dateTimeNewToken);
      let sessionNow:Date = new Date();
      return sessionNow.getTime() - sessionInit.getTime();
    }
    catch(e){
        return -1
    }
  }

  isTimetSessionValid():boolean{// solo para el exp
      let diffSessionTime:number = this.getDiffTimeSession();
      let timeTokenValido:number = this.getTimeTokenValido();//segundos
      //console.log(`dierencia ${diffSessionTime}, time token ${timeTokenValido}`);
      if(diffSessionTime<0 || timeTokenValido<0){
        return false
      }
      return diffSessionTime < timeTokenValido*1000;
  }

  isTimetSessionRefreshValid():boolean{
    let diffSessionTime:number = this.getDiffTimeSession();
    let timeTokenValido:number = this.getTimeTokenValido();//segundos
    let timeRefreshValido:number = this.getTimeRefreshValido();//segundos
    //console.log(`dierencia ${diffSessionTime}, time token ${timeTokenValido}, time refresh ${timeRefreshValido}`);
    if(diffSessionTime<0 || timeRefreshValido<0 || timeTokenValido<0){
      return false
    }
    return diffSessionTime < (timeTokenValido + timeRefreshValido)*1000;
}

}
