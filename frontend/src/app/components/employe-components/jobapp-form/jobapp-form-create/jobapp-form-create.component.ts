import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
//import { isNumeric } from 'rxjs/util/isNumeric';
import { UserService } from 'src/app/services/user.service';
import { JobService } from "../../jobspage/job.service";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export interface Education {
  value: string;
  viewValue: string;
}

export interface Choice {
  value: string;
  viewValue: string;
}

export interface Gender {
  value: string;
  viewValue: string;
}

export interface Veteran {
  value: string;
  viewValue: string;
}

export interface Disability {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-jobapp-form-create',
  templateUrl: './jobapp-form-create.component.html',
  styleUrls: ['./jobapp-form-create.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class JobappFormCreateComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  choices: Choice[] = [
    {value: 'Yes-0', viewValue: 'Yes'},
    {value: 'No-1', viewValue: 'No'}
  ];

  genders: Gender[] = [
    {value: 'Male-0', viewValue: 'Male'},
    {value: 'Female-1', viewValue: 'Female'},
    {value: 'Prefer Not to disclose-2', viewValue: 'Prefer Not to disclose'}
  ];

  veterans: Veteran[] = [
    {value: 'I am not a veteran-0', viewValue: 'I am not a veteran'},
    {value: 'Recently separated veteran-1', viewValue: 'Recently separated veteran'},
    {value: 'Disabled veteran-2', viewValue: 'Disabled veteran'},
    {value: 'I am not a protected veteran-3', viewValue: 'I am not a protected veteran'}
  ];

  Disabilities: Disability[] = [
    {value: 'I do not have disability-0', viewValue: 'I do not have disability'},
    {value: 'I have disability-1', viewValue: 'I have disability'}
  ];

  Educations: Education[] = [
    {value: 'Some College-0', viewValue: 'Some College'},
    {value: 'Juris Doctor-1', viewValue: 'Juris Doctor'},
    {value: 'Professional Designation', viewValue:'Professional Designation'},
    {value: 'Other', viewValue: 'Other'},
    {value: 'Masters', viewValue:'Masters'},
    {value: 'Honours Bachelors', viewValue:'Honours Bachelors'},
    {value: 'High School Diploma', viewValue:'High School Diploma'},
    {value: 'GED', viewValue:'GED'},
    {value: 'Doctorate', viewValue:'Doctorate'},
    {value: 'Diploma', viewValue:'Diploma'},
    {value: 'Certificate', viewValue:'Certificate'},
    {value: 'Bachelors', viewValue:'Bachelors'},
    {value: 'Associates', viewValue:'Associates'}
  ];

  enteredFirstName = "";
  enteredLastName = "";
  enteredTelephone = "";
  enteredEmail = "";
  enteredAddress = "";
  enteredAddress2 = "";
  enteredCity = "";
  enteredState = "";
  enteredZipcode = "";
  enteredJob = "";
  enteredCompany = "";
  enteredLocation = "";
  enteredFromDate = "";
  enteredToDate = "";
  enteredRole = "";
  //enteredJob2 = "";
  enteredSchool = "";
  enteredEducationlevel = "";
  enteredStartDate = "";
  enteredEndDate = "";
  enteredMajor = "";
  enteredCumulativegpa = "";
  enteredSkills = "";
  enteredAccomplishments = "";
  enteredSponsership = "";
  enteredAcknowledgment = "";
  enteredGender = "";
  enteredHispanic = "";
  enteredVeteran = "";
  enteredDisability: "";
  @Output() jobappCreated = new EventEmitter();

  can_id = "";
  //date = new FormControl(new Date());
  can_email = "";
  job_id = "";
  job_title = "";
  job_company = "";
  job_type = "";
  job_industryType= "";
  job_description= "";
  job_location= "";
  job_expirationDate= "";
  rank = 0;
  gpa_check = 3;

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private AuthService:AuthService,
    private jobService: JobService,
    private TokenStorageService: TokenStorageService,
    private UserService:UserService
    ) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.can_id = user.id;
    this.can_email  = this. AuthService.getUserEmail(); // by sharmi for getting the user email --> still not working
    this.job_id = this.jobService.getJobId();
    this.job_title = this.jobService.getJobTitle();
    this.job_company = this.jobService.getJobCompany();
    this.job_type = this.jobService.getJobType();
    this.job_industryType = this.jobService.getJobIndustryType();
    this.job_description = this.jobService.getJobDescription();
    this.job_location = this.jobService.getJobLocation();
    this.job_expirationDate = this.jobService.getJobExpirationDate();

    // console.log("candidate email is: ", this.can_email);
    console.log("job id is:", this.job_id);
    console.log("title is:", this.job_title);
    // console.log("company is:" , this.job_company);
    // console.log("job type is:", this.job_type);
    // console.log("industry is:", this.job_industryType);
    // console.log("description is:" , this.job_description);
    // console.log("location is:" , this.job_location);
    // console.log("expirationDate is:" , this.job_expirationDate);

   /* this.firstFormGroup = this._formBuilder.group({
       firstCtrl: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
       secondCtrl: ''
     });
     this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
     });
     this.fourthFormGroup = this._formBuilder.group({
       fourthCtrl: ['', Validators.required]
    }); */
  }

  onAddJobapp() {
    alert('Congratulation!, you have submitted your application successfully. View the submitted information below');
    const jobapp = {
      firstName: this.enteredFirstName,
      lastName: this.enteredLastName,
      telephone: this.enteredTelephone,
      email: this.enteredEmail,
      address: this.enteredAddress,
      address2: this.enteredAddress2,
      city: this.enteredCity,
      state: this.enteredState,
      zipcode: this.enteredZipcode,
      job: this.enteredJob,
      company: this.enteredCompany,
      location: this.enteredLocation,
      fromDate: this.enteredFromDate,
      toDate: this.enteredToDate,
      role: this.enteredRole,
      /*job2: this.enteredJob2,
      company2: this.enteredCompany,
      location2: this.enteredLocation,
      fromDate2: this.enteredFromDate,
      toDate2: this.enteredToDate,
      role2: this.enteredRole,
      job3: this.enteredJob,
      company3: this.enteredCompany,
      location3: this.enteredLocation,
      fromDate3: this.enteredFromDate,
      toDate3: this.enteredToDate,
      role3: this.enteredRole, */
      schoolname: this.enteredSchool,
      educationlevel: this.enteredEducationlevel,
      startdate: this.enteredStartDate,
      enddate: this.enteredEndDate,
      major: this.enteredMajor,
      cumulativegpa: this.enteredCumulativegpa,
      skills: this.enteredSkills,
      accomplishments: this.enteredAccomplishments,
      sponsership: this.enteredSponsership,
      acknowledgment: this.enteredAcknowledgment,
      gender: this.enteredGender,
      hispanic: this.enteredHispanic,
      veteran: this.enteredVeteran,
      disability: this.enteredDisability
    };
    this.jobappCreated.emit(jobapp);

    if(this.enteredJob == jobapp.job)
    {
      this.rank++;
    }
    if(this.enteredEducationlevel ==  "Bachelors")
    {
      this.rank++;
    }
    if(this.enteredEducationlevel ==  "Doctorate")
    {
      this.rank++;
    }
    if(this.enteredEducationlevel ==  "Masters")
    {
      this.rank++;
    }
/*
   // this.enteredCumulativegpa = +this.enteredCumulativegpa

    if(this.gpa_check <= isNumeric(this.enteredCumulativegpa) )
    {
      this.rank++;
    } 
    */
    if(this.enteredSkills == jobapp.skills)
    {
      this.rank++
    }
    if(this.enteredAccomplishments == jobapp.accomplishments)
    {
      this.rank++;
    }
    if(this.enteredSponsership == "No-1")
    {
      this.rank++;
    }
    if(this.enteredGender == "Female-1")
    {
      this.rank++;
    }
    if(this.enteredHispanic == "Yes-0")
    {
      this.rank++;
    }
    if(this.enteredVeteran == "Recently separated veteran-1")
    {
      this.rank++;
    }
    if(this.enteredVeteran == "Disabled veteran-2")
    {
      this.rank++;
    }
    if(this.enteredVeteran == "I am not a protected veteran-3")
    {
      this.rank++;
    }

    //update application that hr can view application form
    let req1 ={
      candidate_num: this.can_id,
      job_num: this.job_id,
      firstName: jobapp.firstName,
      lastName: jobapp.lastName,
      telephone: jobapp.telephone,
      email: jobapp.email,
      address: jobapp.address,
      address2: jobapp.address2,
      city: jobapp.city,
      state: jobapp.state,
      zipcode: jobapp.zipcode,
      job: jobapp.job,
      company: jobapp.company,
      location: jobapp.location,
      fromDate: jobapp.fromDate,
      toDate: jobapp.toDate,
      role: jobapp.role,
      schoolname: jobapp.schoolname,
      educationlevel: jobapp.educationlevel,
      startdate: jobapp.startdate,
      enddate: jobapp.enddate,
      major: jobapp.major,
      cumulativegpa: jobapp.cumulativegpa,
      skills: jobapp.skills,
      accomplishments: jobapp.accomplishments,
      sponsership: jobapp.sponsership,
      acknowledgment: jobapp.acknowledgment,
      gender: jobapp.gender,
      hispanic: jobapp.hispanic,
      veteran: jobapp.veteran,
      disability: jobapp.disability
    }
    this.http
      .post("http://localhost:8080/jobappform/apply/application", req1)
      .subscribe(response => {
        console.log("res is :", response);
      });

      // to save as job apply history

      var today_date = new Date();
      var date = today_date.getFullYear() + '-' + (today_date.getMonth() + 1) + '-' + today_date.getDate();
    let reqs = {
      candidate_id: this.can_id,
      job_id: this.job_id,
      job_title: this.job_title,
      job_company: this.job_company,
      job_type: this.job_type,
      job_industryType: this.job_industryType,
      job_description: this.job_company,
      job_location: this.job_location,
      job_expirationDate: this.job_expirationDate,
      applyDate: date 
    }; 
    // console.log(reqs);
     this.http
       .post("http://localhost:8080/jobappform/applied_job", reqs)
       .subscribe(response => {
         console.log("res is :", response);
       });


  //notify the hr that new candidate info
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log("rank is: ", this.rank);
  let can = {
      candidate_id: this.can_id,
      rank: this.rank,
      applyDate: date,
      status:"No"
   };
    const req = { job_id: this.job_id, candidate: can };
    console.log("req is:" , req);
    this.http
      .post("http://localhost:8080/jobappform/job", req)
      .subscribe(response => {
        console.log("res is :", response);
      });
  }
}
