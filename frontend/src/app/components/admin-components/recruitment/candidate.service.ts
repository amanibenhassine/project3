import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, throwError } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHandler } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {


private can_id: string;
private status: string;
private name: string;


constructor(private http: HttpClient,private httpHandler: HttpHandler, private router: Router) { }

getCanId(){
    return this.can_id;
}

setCanId(id) {
    this.can_id = id;
}

getStatus(){
    return this.status;
}

setStatus(status) {
    this.status = status;
}
}