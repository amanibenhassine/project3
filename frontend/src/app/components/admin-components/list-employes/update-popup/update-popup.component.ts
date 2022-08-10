import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export interface DialogData {
  rec_id:String;
  RecruiterEmail:String;
  RecruiterName:String;
  RecruiterPoste:String;
  RecruiterPhone:String;
  changed: boolean,

}

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
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
