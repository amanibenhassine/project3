import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

import { MyfavjobPopupComponent } from './myfavjob-popup/myfavjob-popup.component';
import { UserService } from 'src/app/services/user.service';
import { JobService } from "../jobspage/job.service";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface DialogData {
  job_title: string,
  job_id: string
}

@Component({
  selector: 'app-myfavjob',
  templateUrl: './myfavjob.component.html',
  styleUrls: ['./myfavjob.component.css']
})
export class MyfavjobComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  //found = false;
  jobTitle: any;
  jobType: any;
  location: any;
  industryType: any;
  job: any;
  jobDescription: any;
  userId: string;
  favResult: any;
  id_array: any;
  searchResault: any;
  jobTitles: [];

  constructor( private http: HttpClient,
    private TokenStorageService: TokenStorageService,
    private jobService: JobService,
    public route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.userId = user.id;

    console.log("user_id is: " + this.userId)
    this.searchFavJob();
  }

  searchFavJob()
  {
    let req = {
      can: this.userId,
    };
    this.http
      .post("http://localhost:8080/jobappform/apply/fav_job", req)
      .subscribe(postData => {
        this.searchResault = postData;
      
        this.id_array= this.searchResault[0].job_id_array;
         console.log(this.searchResault);
         console.log(this.id_array);
      });

      // console.log("id: " + this.id_array);
  }

  
//sharmi test
  applyJob(j){
    // console.log("j: "+ j);
    this.jobService.setJobId(j.job_id);
    this.jobService.setJobTitle(j.job_title);
    this.jobService.setJobCompany(j.job_company);
    this.jobService.setJobType(j.job_type);
    this.jobService.setJobLocation(j.job_location);
    this.jobService.setJobDescription(j.job_description);
    this.jobService.setJobIndustryType(j.job_industryType);
    this.jobService.setJobExpirationDate(j.job_expirationDate);
  } //sharmi

  openDialog(j): void {
    const dialogRef = this.dialog.open(MyfavjobPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: { 
        job_id: j.job_id, 
        jobTitle: j.job_title, 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

  delete(j){

    let req ={
      can: this.userId,
      job_id: j.job_id,
    }

    this.http
      .post("http://localhost:8080/jobappform/delete_favjob", req)
      .subscribe(postData => {
        // this.searchResault = postData;
        // console.log(this.id_array);
        console.log("delete one saved job");
      });


  } 

}
