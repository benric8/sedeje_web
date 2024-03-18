import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/remote/autenticacion/auth.service';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RefreshTokenResponse, tokenResponse } from '../../domain/models/Token.model';
import { constantes } from 'src/app/constants';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
    private authTokenInProgress = false;
    private authTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(private route: Router, public authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getToken();
        if (token != undefined && token != null) {
            if(req.url != `${ environment.urlApi }api/authenticate` && !req.url.endsWith('.json')){
                if(!this.authService.isTimetSessionRefreshValid()){
                    return this.redireccionarSiError(req, next)
                }
                if(!req.url.includes('seguridad/refresh')){
                    if(!this.authService.isTimetSessionValid()){
                        return this.handleRefresh(req, next, token)
                    }
                }
                req = this.injectToken(req);
            }
        } 
        else {
            //console.log("No hay Token");
        }
        return next.handle(req);
    }

    private handleRefresh(request: HttpRequest<any>, next: HttpHandler, token: any){
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
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(dataRefresh.data.token);//----------
                    //console.log('refresh realizado correctamente, continua el proceso', request);
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
                //console.log('error refresh jwt interceptor');
                if(err.status === 401 || err.status === 403){
                  this.logOutRefresh();
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
            this.route.navigate(['/cumbre/autenticacion/login'])
        }

        goInicioPublic():void{
            this.route.navigate(['/public/inicio'])
        }

    private redireccionarSiError(request: HttpRequest<any>, next: HttpHandler){
            if(this.authService.getTokenLevel() === constantes.TOK_LVL_OPCIONES){
              this.logOutRefresh();
              return throwError(() => {
                return "Tiempo de inactividad excedido";
              });
            }
            if(this.authService.getTokenLevel() === constantes.TOK_LVL_AUTH){
                if (!this.authTokenInProgress) {
                    this.authTokenInProgress = true;
                    this.authTokenSubject.next(null);
                    let newDAte:Date = new Date();  
                    return this.authService.recuperarTokenAutorization().pipe(
                      switchMap((data: tokenResponse) => {
                        this.authTokenInProgress = false;
                        this.authTokenSubject.next(data.token);
                        this.authService.setToken(data.token);
                        this.authService.setTimeTokenValido(data.exps);
                        this.authService.setTimeRefreshValido(data.refs);
                        return next.handle(this.injectToken(request));
                      }),
                      catchError(err => {
                        //console.log('error autenticate jwt interceptor');
                        if(err.status === 401 || err.status === 403){
                          this.goInicioPublic();
                        }
                        this.authTokenInProgress = false;
                        return throwError(()=>err);
                      }));
              
                  } 
                  else {
                    return this.authTokenSubject.pipe(
                      filter(token => token != null),
                      take(1),
                      switchMap(jwt => {
                        return next.handle(this.injectToken(request));
                      }));
                  }
              }
            this.goInicioPublic();
            return throwError(() => {
                return "Tiempo de inactividad excedido";
            });
        }


  }