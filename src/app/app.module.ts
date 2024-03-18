import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorCredencialesInterceptor } from "../app/infrastructure/security/ErrorCredencialesInterceptor";
import { JwtInterceptor } from "../app/infrastructure/security/JwtInterceptor";
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SdjEffectsArray } from './infrastructure/global-store/sdj.effects';
import { appSDJReducers } from './infrastructure/global-store/sdj.reducers';
import { PageNotFoundModule } from './infrastructure/shared/pages/page-not-found/page-not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot( appSDJReducers ),
    EffectsModule.forRoot( SdjEffectsArray ),
    PageNotFoundModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCredencialesInterceptor, multi: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
