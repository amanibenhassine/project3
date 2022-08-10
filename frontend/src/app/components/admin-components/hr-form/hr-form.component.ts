import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { HrprofilePopupComponent } from '../hr-form/hrprofile-popup/hrprofile-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Account } from "src/app/modals/account";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';





@Component({
  selector: 'app-hr-form',
  templateUrl: './hr-form.component.html',
  styleUrls: ['./hr-form.component.css']
})
export class HrFormComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  hr_id = "";
  firstName = "";
  lastName = "";
  phone = "";
  title = "";
  company = "";
  startDate = "";
  note = "";
  contacts = "";
  

  isLinear = false;

  selectedFile: File = null;

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private TokenStorageService: TokenStorageService,

    public dialog: MatDialog
    ) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.hr_id  = user.id;
    this.getHrInfo();
    this.loadImg();
  }
  //get default info
  getHrInfo() {
    // console.log("client side:", this.hr_id);
    let req ={
      hr_num : this.hr_id,
    }
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:8080/hr/get-profile" , req)
      .subscribe(AccountData => {
        this.firstName = AccountData["firstName"];
        this.lastName = AccountData["lastName"];
        this.phone = AccountData["phone"];
        this.title = AccountData["title"];
        this.company = AccountData["company"];
        this.startDate = AccountData["startDate"];
        this.note = AccountData["note"];
        this.contacts = AccountData["contacts"];
      })
  }
  //save update 
    SaveUpdate(){
      let req = {
        hr_num: this.hr_id,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        title: this.title,
        company: this.company,
        startDate: this.startDate,
        note: this.note,
        contacts: this.contacts
      };

      this.http
        .put("http://localhost:8080/hr/update/", req)
        .subscribe(response => {
          console.log("res is :", response);
        });
      this.openDialog();
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(HrprofilePopupComponent, {
      width: '300px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  } 


  selectFile(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  uploadBotton() {
    // console.log("id is :", this.hr_id);
    const userInfo: string = this.hr_id;

    const fd = new FormData();
    // const fd1 = new FormData();
    fd.append('userImage', this.selectedFile, userInfo);
    // fd1.append('userImage', this.selectedFile, this.selectedFile.name);
    
    // console.log(fd);
    this.http
      .post("http://localhost:8080/images/update-pic" ,fd)
      .subscribe(response => {
        console.log("res is :", response);
      });
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  pic: any;

  loadImg(){
    let req = {
      userInfo: this.hr_id
    }
    this.http
      .post("http://localhost:8080/images/load-pic", req)
      .subscribe(data => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = this.arrayBufferToBase64(data["img"].data.data);
        this.pic = base64Flag + imageStr;
      });
  }

}
