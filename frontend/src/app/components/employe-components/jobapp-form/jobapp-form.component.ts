import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

import { AuthService } from 'src/app/services/auth.service';

import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-jobapp-form',
  templateUrl: './jobapp-form.component.html',
  styleUrls: ['./jobapp-form.component.css']
})
export class JobappFormComponent implements OnInit {

  userId: string;

  storedJobapps = [];

  onJobappAdded(jobapp) {
    this.storedJobapps.push(jobapp);
  } 

  constructor(private UserService: UserService,private AuthService: AuthService,    private TokenStorageService: TokenStorageService,
    ) { }

  ngOnInit() {
    const user = this.TokenStorageService.getUser();
    this.userId = user.id;
    console.log("user_id is: " + this.userId)
  }
  
}
