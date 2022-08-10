import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface Company {
  flag: string;
  name: string;
}

export interface josbtype {
  value: string;
  viewValue: string;
}

export interface location {
  value: string;
  viewValue: string;
}

export interface industry {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent {
  
  hr_id = "";
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  companyCtrl = new FormControl();
  filteredCompany: Observable<Company[]>;

  company: Company[] = [
    {
      name: 'IBM',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
    },
    {
      name: 'Néopolise',
      flag: '../assets/img/neopolise.png'
    },
    {
      name: 'Whitecape',
      flag: '../assets/img/whitecape.png'
    },
    {
      name: 'NeoXam',
      flag: '../assets/img/NeoXam.svg'
    },
   
  ];

  jobtypes: josbtype[] = [
    { value: 'Stage', viewValue: 'Stage' },
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

  jobTitle: string;
  companyName: string;
  location: string;
  industryType: string;
  jobType: string;
  startDate: Date;
  expirationDate: Date;
  description: string;
  name:String;

  posted: boolean;

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private AuthService: AuthService,
    private TokenStorageService: TokenStorageService,

    private router: Router) {

    this.filteredCompany = this.companyCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredCompany(state) : this.company.slice())
      );
  }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.hr_id  = user.id;
    this.posted = true;
  }

  private _filteredCompany(value: string): Company[] {
    const filterValue = value.toLowerCase();
    return this.company.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  submit(){
    let req = {
      job_id: Math.random().toString(36).substr(2,9),
      hr_id: this.hr_id,
      name :this.name,
      title: this.jobTitle,
      jobType: this.jobType,
      company: this.companyName,
      location: this.location,
      industryType: this.industryType,
      startDate: this.startDate,
      expirationDate: this.expirationDate,
      jobDescription: this.description,
      candidate: [],
    };
    console.log(req);
    this.http
      .post("http://localhost:8080/hr/create_job", req)
      .subscribe(response => {
        console.log("job post successed: ", response);
      });
    this.posted = false;

  }

  postAnother(){
      this.jobTitle = "";
      this.companyName = "";
      this.location = "";
      this.industryType= "";
      this.jobType = "";
      this.startDate= null;
      this.expirationDate= null;
      this.description= "";
      this.posted = true;
  }


}


