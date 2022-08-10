import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  choice: any;
  selectedChoice: string;
  roles:string;

  choices = [
    'HR',
    'Recruiter',
    'Candidate',
   ];

  constructor(private authService: AuthService, private UserService:UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    

    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.roles = this.choice;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  
}
