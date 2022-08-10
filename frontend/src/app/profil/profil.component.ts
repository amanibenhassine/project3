import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService) { }
  ngOnInit() {
    this.currentUser = this.token.getUser();

  }

}
