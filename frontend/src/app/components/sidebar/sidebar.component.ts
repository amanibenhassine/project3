import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Employe } from 'src/app/modals/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showModeratorBoard = false;

  username: string;
  email : String ;
  employe : Employe = new Employe();
  id : number;
  img : boolean;
  fullImg : boolean;
  emptyImg : boolean;
  
  

  constructor(private tokenStorageService: TokenStorageService,private http: HttpClient,    private _formBuilder: FormBuilder,

    private userService: UserService,private employeService :EmployeService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.id = user.id;
      this.loadImg();

     
    }

    this.getEmploye();
    console.log(this.userService.getUserAvatar(this.id))
    if (this.userService.getUserAvatar(this.id) === null)
      this.img = false;
    else this.img =true;
  }

  logout() {
    this.tokenStorageService.signOut();
    
  }

  getEmploye() {
    console.log(this.id);
    this.employeService.getEmploye(this.id).subscribe(
      response => {
        this.employe = response ; }
    );
  }
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  pic: any;

  loadImg() {
    let req = {
      userInfo: this.id
    }
    this.http
      .post("http://localhost:8080/images/load-pic", req)
      .subscribe(data => {
        var base64Flag = 'data:image/jpeg;base64,';
        // var imageStr = this.arrayBufferToBase64(data["img"].data.data);
        var imageStr = this.arrayBufferToBase64(data["img"].data.data);
        this.pic = base64Flag + imageStr;
      });

}
}
