import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Subject, throwError } from "rxjs";


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private id: "";
  private userEmail: string;

  islogin = false ;
  

  constructor(private http: HttpClient , private router: Router) { }


  getUser() {
 
    return this.id;
  }
  getUserEmail() {
    return this.userEmail;
}  



  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    this.islogin=true;
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      password: user.password
    }, httpOptions);
  }
}