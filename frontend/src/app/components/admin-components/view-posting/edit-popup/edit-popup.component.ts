import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface DialogData {
  job_id: string,
  title: string,
  jobType: string,
  location: string,
  industryType: string,
  company: string,
  jobDescription: string,
  changed: boolean,
  startDate: Date,
  expirationDate: Date
}

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditPopupComponent>,
    private TokenStorageService: TokenStorageService,
        @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) { }

  ngOnInit() {
    console.log(this.data.changed);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  // update(){
  //   // data.changed = true;
  //   this.onNoClick();
  // }

}
