import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/remote/autenticacion/auth.service';
import Swal from 'sweetalert2';
import { constantes } from 'src/app/constants';
import { RefreshTokenResponse } from 'src/app/domain/models/Token.model';

@Injectable()
export class ErrorCredencialesInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  constructor(private route: Router, public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ((err.status === 401 || err.status === 403) && !request.url.endsWith('api/authenticate') ) {
            if(request.url.includes('seguridad/refresh')){
              return throwError(()=>err);
            }
            else{
              let usuarioLocal:string|null =this.authService.getToken()
              return this.handle401Error(request, next, usuarioLocal);
            }
          }
          else{
            return throwError(()=>err);
          }
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, token: any) {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      let newDAte:Date = new Date();
      return this.authService.refreshToken(token).pipe(
        switchMap((data: any) => {
          let dataRefresh:RefreshTokenResponse = data;
          if(dataRefresh.codigo===constantes.RESPONSE_COD_EXITO){
            this.authService.setToken(dataRefresh.data.token);
            this.authService.setDatetimeNewToken(newDAte);
            //this.authService.setTokenAdmin(token.tokenAdmin);
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(data.token);//----------
            return next.handle(this.injectToken(request));
          }
          else{
            return throwError(() => {
              return dataRefresh.descripcion;
            });
          }
        }),
        catchError(err => {
          //this.refreshTokenInProgress = false;
          if(err.status === 401 || err.status === 403){
            //this.logOutRefresh();
            this.redireccionarSiError()
            //console.log("error refresh",err);
          }
          this.refreshTokenInProgress = false;
          return throwError(()=>err);
        }));

    } 
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.injectToken(request));
        }));
    }
  }

  injectToken(request: HttpRequest<any>) {
    //console.log("inyectamdo");
    const token = this.authService.getToken();
    // const tokenAdmin = this.authService.getTokenAdmin();
    if(request.headers.get('x-multimedia')==='si'){
      return request.clone({
          setHeaders: {
              Authorization: `Bearer ${ token }`
          }
      });
    }
    return request.clone({
        setHeaders: {
            'Content-Type':  'application/json',
            Authorization: `Bearer ${ token }`
        }
    });
  }

  logOutRefresh():void{
    //Swal.fire('Atención!', 'Error en autenticación, intente ingresar al sistema nuevamente', 'error');
    this.route.navigate(['/consulta'])
  }

  goInicioPublic():void{
    this.route.navigate(['/consulta'])
  }

  redireccionarSiError():void{
    if(this.authService.getTokenLevel() === constantes.TOK_LVL_OPCIONES){
      this.logOutRefresh();
      return
    }
    this.goInicioPublic();
  }

}