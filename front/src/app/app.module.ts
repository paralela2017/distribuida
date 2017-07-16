import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { SecureComponent } from './secure/secure.component'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'secure', component: SecureComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: LoginComponent}
];

/*export const routes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent}
];*/

/*export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      tokenGetter: (() => localStorage.getItem('token')) })
      , http, options);
}*/

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    SecureComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserModule,
  ],
  providers: [AuthService, AuthGuardService, {
              provide: AuthHttp,
              useFactory: authHttpServiceFactory,
              deps: [Http,RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
