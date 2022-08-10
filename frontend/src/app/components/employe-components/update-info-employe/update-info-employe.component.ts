import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/modals/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-info-employe',
  templateUrl: './update-info-employe.component.html',
  styleUrls: ['./update-info-employe.component.css']
})
export class UpdateInfoEmployeComponent  {


  id: number ; 
  private employe: Employe ;
  public fileImage : File;
  public message: string;

  constructor(private route: ActivatedRoute, private router:Router,
    private employeService: EmployeService) { }

  

 onSelectFile(event) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.fileImage = file;
   // this.f['profile'].setValue(file);

  

  }}}
