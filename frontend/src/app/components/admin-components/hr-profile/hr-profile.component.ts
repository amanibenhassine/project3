import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { Account } from "src/app/modals/account";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';



@Component({
  selector: 'app-hr-profile',
  templateUrl: './hr-profile.component.html',
  styleUrls: ['./hr-profile.component.css']
})
export class HrProfileComponent implements OnInit {
  hr_id = "";
  firstName = "";
  lastName = "";
  phone = "";
  title = "";
  company = "";
  startDate = "";
  note = "";
  contacts = "";
  showDate: Date;
  filePath: "";
  url: string;

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private AuthService: AuthService,
    private TokenStorageService: TokenStorageService,

  ) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.hr_id  = user.id;
    this.getHrInfo();
    this.loadImg();
  }
  
  //get default account default
  getHrInfo() {
    // console.log("client side:", this.hr_id);
    let req = {
      hr_num: this.hr_id,
    }
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:8080/hr/get-profile", req)
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

  getImage(){
    console.log("get image");
    let req = {
      userInfo: this.hr_id,
    }
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:8080/images/get-pic", req)
      .subscribe(AccountData => {
        this.filePath = AccountData["img"];
        console.log(" proflile path is : " + this.filePath);
        // var path = '../../../';
        // var reader = new FileReader();
        // this.url = path + this.filePath;
        // console.log(this.url);
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
