import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http,private router: Router) { }

  login(email,password) {
    let headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    //let options = new RequestOptions({headers: headers});
    //var datos = JSON.stringify({'email': email, 'password': password});
    //var datos = ['email': email, 'password': password];
    //credentials: Credentials;
    //let a: Credentials ={ email: email, password: password};
    //var = "email="
    let datos = new URLSearchParams();
    datos.append('email', email);
    datos.append('password',password);
    //let body = URLSearchParams.toString();
    this.http.post('http://localhost:8000/api/auth_login', datos, headers)
      .map(res=>res.json())
      .subscribe(
        data => localStorage.setItem('token', data.token),
        error => console.log(error)
      );
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
