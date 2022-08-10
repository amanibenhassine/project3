import { Component, OnInit } from '@angular/core';
import {  EmployeService } from '../../../services/employe.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UpdatePopupComponent} from './update-popup/update-popup.component';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface DialogData {
  rec_id:String;
  hr_id : string;

  RecruiterEmail:String;
  RecruiterName:String;
  RecruiterPoste:String;
  RecruiterPhone:String;
}

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrls: ['./list-employes.component.css']
})
export class ListEmployesComponent implements OnInit {
  rec_id:String;

  RecruiterEmail:String;
  RecruiterName:String;
  RecruiterPoste:String;
  RecruiterPhone:String;
  hrId: string;

  panelOpenState = false;
  hr_id : string;
  count : number;
  searchResault: any;
  status = 'Enable';
  toggle = true;
  changed: boolean;
  appResult: any;


  constructor( 
    private http: HttpClient,
    private AuthService:  AuthService, 
    private TokenStorageService: TokenStorageService,

    public dialog: MatDialog) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.hrId = user.id;
    console.log("hr_id is: " + this.hrId)
    this.searchPostedRec();

  }

  searchPostedRec(){
    let req = {
      hr_id: this.hrId,
    };
    this.http
      .post("http://localhost:8080/hr/rec_list", req)
      .subscribe(postData => {
        this.appResult = postData;
        // console.log(this.searchResault[0]);
        console.log("successed search");
        });
  }
  delete(emp){
    let req ={
      rec_id: emp.rec_id,
    }
    // console.log(req);
    this.http
      .post("http://localhost:8080/hr/delete_recruiter", req)
      .subscribe(response => {
        console.log("Recruiter delete successed: ", response);
      });
  }
  openDialog(r): void {
    this.changed = true;
    const dialogRef = this.dialog.open(UpdatePopupComponent, {
      width: '800px',
      height: '600px',
      data: {rec_id: r.rec_id, 
         name: r.RecruiterName,
        email: r.RecruiterEmail,
        poste:r.RecruiterPoste,
        phone:r.RecruiterPhone,
         changed: r.changed }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.rec_id = result.rec_id;

        this.RecruiterEmail = result.email;
        this.RecruiterName = result.name;
        this.RecruiterPoste =  result.poste;
        this.RecruiterPhone=  result.phone;
        this.updateRecruit();
      }
    });
  } 

  update(r){
    this.openDialog(r);
  }

  updateRecruit(){
    let req = {
      hr_id : this.hrId,
      rec_id: this.rec_id,
      name: this.RecruiterName,
      email: this.RecruiterEmail,
      poste:this.RecruiterPoste,
      phone:this.RecruiterPhone,
     
    };
    this.http
      .post("http://localhost:8080/hr/update_recruiter", req)
      .subscribe(response => {
        console.log("rec update successed: ", response);
      });

  }
}
  