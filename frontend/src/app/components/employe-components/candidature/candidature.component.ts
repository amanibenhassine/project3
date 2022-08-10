import { Component, OnInit } from '@angular/core';
import {UploadFilService } from 'src/app/services/Uploadfil.service';
import { CandidateService } from '../../../services/candidate.service';
import { Candidate } from 'src/app/modals/candidate';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/modals/employee.model';
import { NgForm } from '@angular/forms';
import { UploadfileService } from '../../../services/uploadfile.service';

declare var M: any;

@Component({
  selector: 'candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  form: any = {};

  public fileCV: File;
  public fileLettre : File;

  candidat: Candidate = new Candidate();

  constructor(private candidateService:CandidateService,
              private uploadService: UploadfileService,
              private router: Router) { }

  ngOnInit() {
  }

  
   /*saveForm(submitForm: FormGroup){
     if (submitForm.valid){
       const user = submitForm.value;
       const formData = new formData;
       formData.append('user', user);
       formData.append('file', this.userFile);
       this.candidateService.saveUserProfile(formData).subscribe(  data => {
        alert("candidate created successfully");
      } );
     } else {
       this.validateFormFields(submitForm);
     }
     }*/

   

  createCandidate() {
    this.candidateService.createCandidate(this.candidat,this.fileCV,this.fileLettre)
      .subscribe( data => {
        alert("candidate created successfully");
      } );
      this.router.navigate(['/response']);
    
    };


  selectFileLettre(event){
    this.fileLettre = event.target.files[0];
  }
  selectFileCV(event){
    this.fileCV = event.target.files[0];
  }
  

  }

 