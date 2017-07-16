import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})



export class SecureComponent implements OnInit {

  //var stuff = [ "hola"];
  //stuff: [];
  profesores: string;

  //constructor(private authHttp: AuthHttp) {  }

  constructor(private authHttp: Http) {  }

  ngOnInit() {
    this.profesores = "a";
  }

  getSecure(){
    /*this.authHttp.get('http://localhost:8000/api/secure')
      .map(res=>res.json())
      .subscribe(
        data => this.profesores = data,
        error => console.log(error)
      );
*/
      console.log(localStorage.getItem('token'));
      /*this.authHttp.get('http://localhost:8000/api/secure')
        .map(res=>res.json())
        .subscribe(
          data => this.profesores = data,
          err => console.log(err),
          () => console.log('Request Complete')
        );*/
        let datos = new URLSearchParams();
        var token = localStorage.getItem('token');
        //datos.append('token', token);
        this.authHttp.get('http://localhost:8000/api/profesores'+'?'+'token='+token)
          .map(res=>res.json())
          .subscribe(
            data => this.profesores = data,
            err => console.log(err),
            //() => console.log('Request Complete')
          );
  }
}
