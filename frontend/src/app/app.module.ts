import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import 'hammerjs';
import { ToastrModule } from 'ngx-toastr';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddEmployeComponent } from './components/admin-components/add-employe/add-employe.component';
import { EmployeService } from './services/employe.service';
import { Employe } from './modals/employe';
import { EmployeeService } from './services/employee.service';
import { Employee } from './modals/employee.model';
import { InfoCandidateComponent } from './components/candidate-components/info-candidate/info-candidate.component';
import { ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CommonModule } from '@angular/common';

import { FlatpickrModule } from 'angularx-flatpickr';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-bootstrap/modal';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgxPaginationModule } from 'ngx-pagination' ; 

import { ListEmployesComponent } from './components/admin-components/list-employes/list-employes.component';
import { TodoListComponent } from './components/admin-components/todos/todo-list/todo-list.component';
import { MatDialogModule, } from '@angular/material/dialog';
import { TodoService } from './services/todo.service';
import { ProfileEmployeComponent } from './components/admin-components/profile-employe/profile-employe.component';
import { UpdateEmployeComponent } from './components/admin-components/update-employe/update-employe.component';


import { RecrutementsComponent } from './components/admin-components/recrutements/recrutements.component';
import { NotesInternesComponent } from './components/admin-components/notes/notes-internes/notes-internes.component';
import { EmailService } from './services/email.service';
import { MatCheckboxModule,  } from '@angular/material';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';




import { AjoutNoteComponent } from './components/admin-components/notes/ajout-note/ajout-note.component';
import { TimetrackingComponent } from './components/employe-components/timetracking/timetracking.component';
import { AddTodoComponent } from './components/admin-components/todos/add-todo/add-todo.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MeetingComponent } from './components/admin-components/meetings/meeting/meeting.component';
import { ListMeetingComponent } from './components/admin-components/meetings/list-meeting/list-meeting.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ListCongesComponent } from './components/admin-components/conges/list-conges/list-conges.component';
import { AcceptComponent } from './components/admin-components/dialogs/accept/accept.component';
import { HolidayCalendarComponent } from './components/admin-components/holiday-calendar/holiday-calendar.component';
import { HomeComponent } from './components/home/home.component';

import { FooterComponent } from './components/footer/footer.component';
import {InfoEmployeComponent} from './components/employe-components/info-employe/info-employe.component';
import { ProfilCandidatComponent } from './components/admin-components/profil-candidat/profil-candidat.component';
import {AccumulationChartModule} from '@syncfusion/ej2-angular-charts';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';


import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PieComponent } from './shared/widgets/pie/pie.component';
import { LineComponent } from './shared/widgets/line/line.component';
import { Pie2Component } from './shared/widgets/pie2/pie2.component';
import { PresenceAdminComponent } from './components/admin-components/presence/presence-admin/presence-admin.component';
import { UpdateInfoEmployeComponent } from './components/employe-components/update-info-employe/update-info-employe.component';
import { UpdateMeetingComponent } from './components/admin-components/meetings/update-meeting/update-meeting.component';
import { UpdateNoteComponent } from './components/admin-components/notes/update-note/update-note.component';
import { UpdateTodoComponent } from './components/admin-components/todos/update-todo/update-todo.component';
import { UpdatePhotoComponent } from './components/admin-components/update-photo/update-photo.component';
import { BilanCongesComponent } from './components/admin-components/conges/bilan-conges/bilan-conges.component';
import { ResponseComponent } from './components/candidate-components/response/response.component';
import { UpdateProfilComponent } from './components/update-profil/update-profil.component';
import { ArchivedEmployesComponent } from './components/admin-components/archived-employes/archived-employes.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import { TokenStorageService } from './services/token-storage.service';
import {AuthService} from './services/auth.service'
import {    MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { CardsComponent } from './components/cards/cards.component';


import { CandidatureComponent } from './components/employe-components/candidature/candidature.component';
import { OffresActuellesComponent } from './components/employe-components/offres-actuelles/offres-actuelles.component';
import { AddPresenceComponent } from './components/employe-components/add-presence/add-presence.component';
import { BookComponent } from './components/admin-components/notes/book/book.component';
import { BookService } from './services/book.service';
import { BookDetailComponent } from './components/admin-components/notes/book-detail/book-detail.component';
import { BookCreateComponent } from './components/admin-components/notes/book-create/book-create.component';
import { BookEditComponent } from './components/admin-components/notes/book-edit/book-edit.component';
import { PostJobComponent } from './components/admin-components/post-job/post-job.component';
import { JobspageComponent } from './components/employe-components/jobspage/jobspage.component';
import { JobspagePopupComponent } from './components/employe-components/jobspage/jobspage-popup/jobspage-popup.component';
import { MyfavjobComponent } from './components/employe-components/myfavjob/myfavjob.component';
import { JobappFormComponent } from './components/employe-components/jobapp-form/jobapp-form.component';
import { JobappFormCreateComponent } from './components/employe-components/jobapp-form/jobapp-form-create/jobapp-form-create.component';
import { JobappFormReviewComponent } from './components/employe-components/jobapp-form/jobapp-form-review/jobapp-form-review.component';
import { ApplicationsComponent } from './components/employe-components/applications/applications.component';

import { ApplicationsPopupComponent } from './components/employe-components/applications/applications-popup/applications-popup.component';
import { MyfavjobPopupComponent } from './components/employe-components/myfavjob/myfavjob-popup/myfavjob-popup.component';
import { EditPopupComponent } from './components/admin-components/view-posting/edit-popup/edit-popup.component';
import { HrprofilePopupComponent } from './components/admin-components/hr-form/hrprofile-popup/hrprofile-popup.component';
import { CanFormPopupComponent } from './components/employe-components/candidate-form/can-form-popup/can-form-popup.component';
import { HrProfileComponent } from './components/admin-components/hr-profile/hr-profile.component';

import { CandProfileComponent } from './components/employe-components/cand-profile/cand-profile.component';
import { CandidateFormComponent } from './components/employe-components/candidate-form/candidate-form.component';
import { ViewPostingComponent } from './components/admin-components/view-posting/view-posting.component';
import { ViewApplicantsComponent } from './components/admin-components/view-applicants/view-applicants.component';
import { ViewPopupComponent } from './components/admin-components/view-applicants/view-popup/view-popup.component';
import { HrFormComponent } from './components/admin-components/hr-form/hr-form.component';
import { UpdatePopupComponent } from './components/admin-components/list-employes/update-popup/update-popup.component';
import { RecruitmentComponent } from './components/admin-components/recruitment/recruitment.component';

@NgModule({
  declarations: [
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AddEmployeComponent,
    InfoCandidateComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    PostJobComponent,
    JobspageComponent,
    MyfavjobComponent,
    JobappFormComponent,
    JobappFormCreateComponent,
    JobappFormReviewComponent,
    CandProfileComponent,
    CandidateFormComponent,
    ViewPostingComponent,
    //EditPopupComponent,
    ViewApplicantsComponent,
 HrProfileComponent ,
 HrFormComponent,


    
    ListEmployesComponent,
    TodoListComponent,
    ProfileEmployeComponent,
    UpdateEmployeComponent,
    
    RecrutementsComponent,
    NotesInternesComponent,
    AjoutNoteComponent,
  
    TimetrackingComponent,
    
    AddTodoComponent,
    MeetingComponent,
    ListMeetingComponent,
    LoginComponent,
    RegisterComponent,
    ListCongesComponent,
    AcceptComponent,
    
    HolidayCalendarComponent,
    HomeComponent,
    FooterComponent,
    InfoEmployeComponent,
    ProfilCandidatComponent,
    ProfilComponent,
    DashboardComponent,
    PublicLayoutComponent,
    PieComponent,
    LineComponent,
    Pie2Component,
    PresenceAdminComponent,
    UpdateInfoEmployeComponent,
    UpdateMeetingComponent,
    UpdateNoteComponent,
    UpdateTodoComponent,
    
    UpdatePhotoComponent,
    BilanCongesComponent,
    ResponseComponent,
    UpdateProfilComponent,
    ArchivedEmployesComponent,
    CardsComponent,
    
    
    CandidatureComponent,
    OffresActuellesComponent,
    AddPresenceComponent,
    JobspagePopupComponent,
   ApplicationsPopupComponent,
   ApplicationsComponent,

 MyfavjobPopupComponent,
    EditPopupComponent,
   HrprofilePopupComponent,
   CanFormPopupComponent,
   ViewPopupComponent,
   UpdatePopupComponent,
   RecruitmentComponent,
    
    
   
    //LoginComponent,
    //RegisterComponent,
    //HomeComponent,
   
 
 
  ],
  imports: [
    ToastrModule.forRoot(),
    MatNativeDateModule,
    MatRippleModule,

    MatRadioModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDialogModule,
    ScheduleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    ModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    FullCalendarModule,
    AccumulationChartModule,
    HighchartsChartModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    EditorModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],

  exports: [
    MatAutocompleteModule,
    PieComponent,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [MatDatepickerModule,EmployeService,BookService,EmployeeService,TodoService,EmailService,authInterceptorProviders, AuthService,TokenStorageService, { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent,ListCongesComponent],
  entryComponents:[AjoutNoteComponent,AddTodoComponent,MeetingComponent,AcceptComponent,UpdateMeetingComponent,JobspagePopupComponent, 
    ApplicationsPopupComponent, 
    MyfavjobPopupComponent,
    EditPopupComponent,
    HrprofilePopupComponent,
  CanFormPopupComponent,
    ViewPopupComponent,
    UpdatePopupComponent,
  ],
})
export class AppModule { }
