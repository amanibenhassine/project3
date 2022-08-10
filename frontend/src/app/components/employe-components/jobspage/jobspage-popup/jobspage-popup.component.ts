import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { JobService } from "../job.service";
import { UserService } from 'src/app/services/user.service';

import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface DialogData {
  jobId: string,
  jobTitle: string,
  jobType: string,
  location: string,
  industryType: string,
  company: string,
  jobDescription: string,
  expirationDate: Date 
}

@Component({
  selector: 'app-jobspage-popup',
  templateUrl: './jobspage-popup.component.html',
  styleUrls: ['./jobspage-popup.component.css']
})
export class JobspagePopupComponent implements OnInit {
  select: boolean;
  status = 'Enable';
  toggle = true;
  //userId: string;
  can_id = "";
  can_email = "";
  job_id = "";
  job_title = "";
  job_company = "";
  job_type = "";
  job_industryType= "";
  job_description= "";
  job_location= "";
  job_expirationDate= "";

  constructor(
    public dialogRef: MatDialogRef<JobspagePopupComponent>,
    private UserService:  AuthService ,
    private TokenStorageService: TokenStorageService,

    private jobService: JobService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData
    ) {
    }
 
  ngOnInit() {
    this.select = false;
    const user = this.TokenStorageService.getUser();
    this.can_id= user.id;
     // by sharmi for getting the user email --> still not working
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  addFav(){
    //write fuction to change the icon to filled icon, then add the job id and details in candidate's fav list
    this.select = !this.select;
    this.enableDisableRule();

    let arr = {
      job_id: this.data.jobId,
      job_title: this.data.jobTitle,
      job_type: this.data.jobType,  
      job_location: this.data.location, 
      job_company: this.data.company, 
      job_expirationDate: this.data.expirationDate, 
    }

    if (this.select == true) {
      let reqs = {
        can_id: this.can_id,
        job_id_array: arr,
      }; 

      this.http
        .post("http://localhost:8080/jobappform/fav_job", reqs)
        .subscribe(response => {
          console.log("res is :", response);
        });
      }

   
      if(this.select == false){
        let req = {
           can: this.can_id,

          job_id: this.data.jobId,
        }

        this.http
          .post("http://localhost:8080/jobappform/delete_favjob", req)
          .subscribe(postData => {
            // console.log("delete one saved job");
          });
      }
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }



}

 
 
  












