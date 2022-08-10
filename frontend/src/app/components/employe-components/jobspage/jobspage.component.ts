import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

import { JobspagePopupComponent } from './jobspage-popup/jobspage-popup.component';
import { JobService } from "./job.service";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';




interface josbtype {
  value: string;
  viewValue: string;
}

interface location {
  value: string;
  viewValue: string;
}

interface industry {
  value: string;
  viewValue: string;
}
//If you have data passed from dialog
export interface DialogData {
  jobId: string,
  jobTitle: string,
  jobType: string,
  location: string,
  industryType: string,
  company: string,
  expirationDate: Date 
}

@Component({
  selector: 'app-jobspage',
  templateUrl: './jobspage.component.html',
  styleUrls: ['./jobspage.component.css']
})
export class JobspageComponent implements OnInit {

  jobtypes: josbtype[] = [
    { value: 'Internship', viewValue: 'Internship' },
    { value: 'Co-op', viewValue: 'Co-op' },
    { value: 'Full Time', viewValue: 'Full Time' },
    { value: 'Part Time', viewValue: 'Part Time' }
  ];

  locations: location[] = [
    { value: 'Tunis', viewValue: 'Tunis' },
    { value: 'Ariana', viewValue: 'Ariana' },
    { value: 'Nabeul', viewValue: 'Nabeul' },
    { value: 'Sousse', viewValue: 'Sousse' },
    { value: 'kairouan', viewValue: 'Kairouan' },
    { value: 'Sfax', viewValue: 'Sfax' },
    { value: 'Gabes', viewValue: 'Gabes' },
  
  
   
  ];

  industries: industry[] = [
    { value: 'Informatique', viewValue: 'Informatique' },

    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'Government/Education', viewValue: 'Government/Education' },
    { value: 'Consulting', viewValue: 'Consulting' },
    { value: 'Transportation/Logistics', viewValue: 'Transportation/Logistics' },
    { value: 'Others', viewValue: 'Others' }
  ];

  enteredjobTitle = "";
  enteredjobType = "";
  enteredlocation = "";
  enteredindustryType = "";
  enteredcompany = "";
  enteredjobDescription = "";

  //found = false;
  jobTitle: any;
  jobType: any;
  location: any;
  industryType: any;
  job: any;
  jobDescription: any;
  userId: string;
  

  constructor(
    private TokenStorageService: TokenStorageService,

    private http: HttpClient,
    private jobService: JobService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private UserService: UserService,
    private AuthService: AuthService

  ) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.userId = user.id;
        console.log("user_id is: " + this.userId );
    this.searchJob(null);
   
  }

  searchJob(form: NgForm) {
    //console.log(this.enteredjobTitle)
    let req = { 
      jobTitle: this.enteredjobTitle, 
      jobType: this.enteredjobType, 
      location: this.enteredlocation, 
      industryType: this.enteredindustryType
    };
    console.log("front end :" , req);
    this.http
      .post("http://localhost:8080/searchjob", req)
      .subscribe(postData => {
        this.job = postData;
        console.log(this.job);
      });

    console.log("the search function will return the job_id, so you can use it in the application form submit");
  
  

}
  applyJob(j){
    // console.log("j: "+ j);
    this.jobService.setJobId(j.job_id);
    this.jobService.setJobTitle(j.title);
    this.jobService.setJobCompany(j.company);
    this.jobService.setJobType(j.jobType);
    this.jobService.setJobLocation(j.location);
    this.jobService.setJobDescription(j.description);
    this.jobService.setJobIndustryType(j.industryType);
    this.jobService.setJobExpirationDate(j.expirationDate);
  }

  openDialog(j): void {
    const dialogRef = this.dialog.open(JobspagePopupComponent, {
      width: 'auto',
      height: 'auto',
      data: { 
        jobId: j.job_id,
        jobTitle: j.title, 
        company: j.company, 
        jobType: j.jobType, 
        location: j.location, 
        industryType: j.industryType, 
        jobDescription: j.jobDescription,
        expirationDate: j.expirationDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.jobTitle = result;
    });
  } 
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof HttpErrorResponse) {
       errMsg = error.error.message;
    } else {
       errMsg = `${error.status} - ${error.statusText || ''} ${error.message}`;
    }

    return(errMsg);
 }
}


