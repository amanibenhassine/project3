  
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmployeService } from 'src/app/services/employe.service';
import { Employe } from 'src/app/modals/employe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modals/user';

@Component({
  selector: 'app-info-employe',
  templateUrl: './info-employe.component.html',
  styleUrls: ['./info-employe.component.css']
})
export class InfoEmployeComponent implements OnInit {


    currentUser: any;

    constructor(private token: TokenStorageService) { }
  
    ngOnInit() {
      this.currentUser = this.token.getUser();
    }
  }
  

  
    


  



