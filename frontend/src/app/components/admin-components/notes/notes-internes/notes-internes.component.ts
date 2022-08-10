import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material'; 
import { AjoutNoteComponent } from '../ajout-note/ajout-note.component';
import { NoteinterneService } from 'src/app/services/noteinterne.service';
import { NoteInterne } from 'src/app/modals/noteInterne';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-notes-internes',
  templateUrl: './notes-internes.component.html',
  styleUrls: ['./notes-internes.component.css']
})
export class NotesInternesComponent  {}



