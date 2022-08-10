import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from "src/app/modals/account";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-cand-profile',
  templateUrl: './cand-profile.component.html',
  styleUrls: ['./cand-profile.component.css']
})
export class CandProfileComponent implements OnInit {

  can_id = "";
  firstName = "";
  lastName = "";
  telephone = "";
  //note = "";
  //contacts = "";
  email = "";
  job = "";
  company = "";
  location = "";
  fromDate = "";
  toDate = "";
  role = "";
  schoolname = "";
  educationlevel = "";
  startdate = "";
  enddate = "";
  major = "";
  certificate = "";
  certificatefrom = "";
  expirationDate = "";

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public route: ActivatedRoute,
    private TokenStorageService: TokenStorageService,

    private UserService: AuthService
    ) {}

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.can_id  = user.id;
    this.getCanInfo();
    this.loadImg();
  }

  getCanInfo() {
    let req ={
      can_num : this.can_id,
    }
    this.http
      .post<{ message: string; account: Account}>(
        "http://localhost:8080/cand-profile/get-profile" , req)
      .subscribe(AccountData => {
        // console.log("Candidate info", AccountData);
        this.firstName = AccountData["fname"];
        this.lastName = AccountData["lname"];
        this.telephone = AccountData["phone"];
        this.email = AccountData["email"];
        this.job = AccountData["job"];
        this.company = AccountData["company"];
        this.location = AccountData["location"];
        this.fromDate = AccountData["fromDate"];
        this.toDate = AccountData["toDate"];
        this.role = AccountData["role"];
        this.schoolname = AccountData["schoolname"];
        this.educationlevel = AccountData["educationlevel"];
        this.startdate = AccountData["startdate"];
        this.enddate = AccountData["enddate"];
        this.major = AccountData["major"];
        this.certificate = AccountData["certificate"];
        this.certificatefrom = AccountData["certificatefrom"];
        this.expirationDate = AccountData["expirationDate"];
      })
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  pic: any;

  loadImg() {
    let req = {
      userInfo: this.can_id
    }
    this.http
      .post("http://localhost:8080/images/load-pic", req)
      .subscribe(data => {
        var base64Flag = 'data:image/jpeg;base64,';
        // var imageStr = this.arrayBufferToBase64(data["img"].data.data);
        var imageStr = this.arrayBufferToBase64(data["img"].data.data);
        this.pic = base64Flag + imageStr;
      });
  }

  
  
}
