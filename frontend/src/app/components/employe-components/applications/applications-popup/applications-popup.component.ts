import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";

import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';



export interface DialogData {
  job_id: string,
  jobTitle: string,
  job_company: string,
  jobType: string,
  location: string,
  industryType: string,
  jobDescription: string
}


@Component({
  selector: 'app-applications-popup',
  templateUrl: './applications-popup.component.html',
  styleUrls: ['./applications-popup.component.css']
})
export class ApplicationsPopupComponent implements OnInit {

  status: string;
  userId: string;
  jobInfo : any;

  title: string;
  company: string;
  jobType: string;
  expirationDate: Date;
  location: string;
  industryType: string;
  hr_id: string;
  name:String;
  jobDescription: string;

  constructor( 
    public dialogRef: MatDialogRef<ApplicationsPopupComponent>,
    private http: HttpClient,
    private UserService:UserService,
    private TokenStorageService: TokenStorageService,

    private AuthService: AuthService,
    //private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.userId = user.id;
    console.log("user_id is: " + this.userId)
    this.checkJobInfo();
    this.company = this.data.job_company;
    this.title =  this.data.jobTitle;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //to check job info 
  checkJobInfo(){
    let req = {
    job_id: this.data.job_id,
    candidate_id: this.userId
    }
  this.http
    .post("http://localhost:8080/jobappform/apply/applied_jobinfo", req)
    .subscribe(postData => {
      this.jobInfo = postData;
      for (var i = 0; i < this.jobInfo.candidate.length; i++){
        if (this.jobInfo.candidate[i].candidate_id == this.userId){
          this.status = this.jobInfo.candidate[i].status;
        }
      }
    });
  }


}
