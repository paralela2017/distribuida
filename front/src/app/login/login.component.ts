import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface Credentials {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  credentials: Credentials;

  constructor(private auth: AuthService, private router: Router) {
    if( this.auth.loggedIn()){
      router.navigate(['dashboard']);
    }
  }

  onLogin(e) {
    //e.preventDefault();
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    var x= JSON.stringify({email,password});
    console.log(x);
    this.auth.login(email,password);
    //this.router.navigate(['login']);
    if(this.auth.loggedIn()){
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
