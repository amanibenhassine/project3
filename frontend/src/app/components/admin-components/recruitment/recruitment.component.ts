import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CandidateService } from "./candidate.service";
import { HttpServiceService } from "./http-service.service";


interface status {
  value: string;
  viewValue: string;
}
export interface DialogData {
  candidate_num: string,
  firstName: string,
  lastName: string,
  telephone: string,
  email: string,
  address: string,
  address2: string,
  city: string,
  state: string,
  zipcode: string,
  job: string,
  company: string,
  location: string,
  fromDate: string,
  toDate: string,
  role: string,
  schoolname: string,
  educationlevel: string,
  startdate: string,
  enddate: string,
  major: string,
  cumulativegpa: string,
  skills: string,
  accomplishments: string,
  sponsership: string,
  acknowledgment: string,
  gender: string,
  hispanic: string,
  veteran: string,
  disability: string
}
export interface DialogData {
  canId: string,
  status: string,
  firstName: string,
  educationLevel: string,
  email :string, 
}
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  Status: status [] = [
    { value: 'yes', viewValue: 'Yes' },
    { value: 'no', viewValue: 'No' },
    
  ]
  enteredStatus = "";
  enteredName = "";
  enteredlocation = "";
  userId: string;
status:any;
can:any;
panelOpenState = false;
hrId: string;
searchResault: any;
applicationResult: any;
name:String;

  constructor( private TokenStorageService: TokenStorageService,

    private http: HttpClient,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private candidateService :CandidateService,
    private UserService: UserService,
    private AuthService: AuthService) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.userId = user.id;
    this.name =user.username;
    // console.log("hr_id is: " + this.hrId)
    this.searchPostedJobs();
  }

  searchPostedJobs() {
    let req = {
      name: this.name,
    };
    this.http
      .post("http://localhost:8080/hr/posted_jobR", req)
      .subscribe(postData => {
        this.searchResault = postData;
        // console.log(this.searchResault[0]);
        // console.log(this.searchResault.length);
      });
  }
  viewCanAppForm(j,jobInfo) {
    // console.log("job num is: ", jobInfo);
  
    let req = {
      candidate_num: j.candidate_id
    };
    this.http
      .post("http://localhost:8080/jobappform/application_check", req)
      .subscribe(postData => {
        this.applicationResult = postData;
        // console.log("post data: ", postData);
        // console.log(this.searchResault.length);
        const passData ={
          candidate_num: postData[0].candidate_num,
          job_num: jobInfo.job_id,
          firstName: postData[0].firstName,
          lastName: postData[0].lastName,
          telephone: postData[0].telephone,
          email: postData[0].email,
          address: postData[0].address,
          address2: postData[0].address2,
          city: postData[0].city,
          state: postData[0].state,
          zipcode: postData[0].zipcode,
          job: postData[0].job,
          company: postData[0].company,
          location: postData[0].location,
          fromDate: postData[0].fromDate,
          toDate: postData[0].toDate,
          role: postData[0].role,
          schoolname: postData[0].schoolname,
          educationlevel: postData[0].educationlevel,
          startdate: postData[0].startdate,
          enddate: postData[0].enddate,
          major: postData[0].major,
          cumulativegpa: postData[0].cumulativegpa,
          skills: postData[0].skills,
          accomplishments: postData[0].accomplishments,
          sponsership: postData[0].sponsership,
          acknowledgment: postData[0].acknowledgment,
          gender: postData[0].gender,
          hispanic: postData[0].hispanic,
          veteran: postData[0].veteran,
          disability: postData[0].disability
        }
      });
    }
   
    }
  