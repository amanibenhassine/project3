import { Component, OnInit } from '@angular/core';
import { UploadfileService } from '../../../services/uploadfile.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/modals/employee.model';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';




@Component({

  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent {

  hr_id = "";
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  posted: boolean;
  RecruiterEmail:String;
  RecruiterName:String;
  RecruiterPoste:String;
  RecruiterPhone:String;

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private AuthService:AuthService,
    private TokenStorageService: TokenStorageService,
    private router: Router){}
  

  ngOnInit(){
    const user = this.TokenStorageService.getUser();
    this.hr_id = user.id;
 
    this.posted = true; 
  }

submit(){
  let req = {
    rec_id: "",
    hr_id:this.hr_id,
    name: this.RecruiterName,
    poste: this.RecruiterPoste,
    phone: this.RecruiterPhone,
    email: this.RecruiterEmail,

  };
  console.log(req);
  this.http
    .post("http://localhost:8080/hr/create_recruiter", req)
    .subscribe(response => {
      console.log("recruiter post successed: ", response);
    });
  this.posted = false;

}
    postAnother(){

  this.RecruiterName = "";
  this.RecruiterPoste = "";
  this.RecruiterPhone = "";
  this.RecruiterEmail = "";

}
}
    
