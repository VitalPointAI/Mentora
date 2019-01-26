import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AttestationModule } from './attestation/attestation.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule
} from '@angular/material';
import { ProfileComponent } from './hr/profile/profile.component';
import { AppRoutingModule }        from './app-routing.module';
import { PublicProfileFormComponent } from './hr/profile/public-profile-form/public-profile-form.component';
import { AttestationListComponent } from './attestation/attestation-list/attestation-list.component';
import { UseraccountPipe } from './useraccount.pipe';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { CreatePositionComponent } from './admin/positions/create-position/create-position.component';
import { PositionOwnerComponent } from './admin/positions/position-owner/position-owner.component';
import { CreateCourseComponent } from './admin/course/create-course/create-course.component';
import { CourseListComponent } from './hr/profile/course-list/course-list.component';
import { DataService } from './util/data.service';
import { CoursesDashboardComponent } from './hr/training/courses-dashboard/courses-dashboard.component';
import { ViewMentorProfileComponent } from './hr/profile/view-mentor-profile/view-mentor-profile.component';
import { MentorCourseListComponent } from './hr/profile/view-mentor-profile/mentor-course-list/mentor-course-list.component';
import { AddReputationComponent } from './reputation/add-reputation/add-reputation.component';
import { DeleteCourseComponent } from './admin/course/delete-course/delete-course.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PublicProfileFormComponent,
    AttestationListComponent,
    UseraccountPipe,
    AdminComponent,
    CreatePositionComponent,
    PositionOwnerComponent,
    CreateCourseComponent,
    CourseListComponent,
    CoursesDashboardComponent,
    ViewMentorProfileComponent,
    MentorCourseListComponent,
    AddReputationComponent,
    DeleteCourseComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AttestationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
