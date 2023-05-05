import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentComponent } from './document/document.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { APIComponent } from './api/api.component';


import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUniversityComponent } from './api/add-university/add-university.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { MatSortModule } from '@angular/material/sort';
import { EditUniversityComponent } from './edit-university/edit-university.component';



const appRoute : Routes = [

  { path: 'signup', component : SignupComponent},

  { path : 'login', component : LoginComponent},

  { path : 'welcome', component : WellcomeComponent},

  { path : 'home', component : WellcomeComponent},

  { path : 'profile', component : ProfileComponent},

  { path : 'edit-profile', component : EditProfileComponent},

  { path : 'logout', component : LoginComponent},

  { path : 'document', component : DocumentComponent},

  { path : 'resetPassword', component : ResetpasswordComponent},

  { path : 'pdfViewer', component : PdfViewerComponent},

  

  { path : 'fileViewer', component : FileViewerComponent},

  { path : 'api', component : APIComponent},

  { path : 'addUniversity', component : AddUniversityComponent},

  { path : 'announcement', component : AnnouncementComponent},

  { path : '', redirectTo: 'signup', pathMatch : "full"},

  { path : 'edit-announcement/:id', component : EditAnnouncementComponent },

  { path : 'edit-university/:id', component : EditUniversityComponent}
  
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WellcomeComponent,
    ProfileComponent,
    EditProfileComponent,
    DocumentComponent,
    ResetpasswordComponent,
    NavbarComponent,
    PdfViewerComponent,
    FileViewerComponent,
    DndDirective,
    ProgressComponent,
    APIComponent,
    AddUniversityComponent,
    AnnouncementComponent,
    EditAnnouncementComponent,
    EditUniversityComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    PdfViewerModule,
    MatProgressBarModule,
    MatTableModule,
    HttpClientModule,
    NgxPaginationModule,
    NgConfirmModule,
    MatSortModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
