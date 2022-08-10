import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modals/user';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { Subject, throwError } from "rxjs";


const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string;
  private userEmail: string;


  
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) { }

  public getUser(id: any) {
    console.log("this is id ="+ id)
    return this.http.get<any>("http://localhost:8080/user/"+ id);
  }

  getUserId() {
 
    return this.userId;
  }
  getUserEmail() {
    return this.userEmail;
}   

  public getUserAvatar(id: number){
    return this.http.get("http://localhost:8080/avatar/"+ id);
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
 
  }

 



  /*public getUserAvatar(id: number){
    return this.http.get(`${environment.baseURL}/avatar/${id}`);
  }*/

  toastMessage(message){
    this._snackbar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
     })
  }
  updatePassword( email: String, oldPass: String, newPass: String ) {
    const addBody = {
      'email': email,
      'oldPass': oldPass,
      'newPass': newPass
    } ;

    return  this.http.post<User>("http://localhost:8080/updatePassword", addBody);
  }

  updateUsername( email: String, username: String ) {
    const addInfo = {
      'email': email,
      'username': username
      
    } ;

    return  this.http.post<User>("http://localhost:8080/updateUsername", addInfo);
  }


  

}