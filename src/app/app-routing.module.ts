import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './hr/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CoursesDashboardComponent } from './hr/training/courses-dashboard/courses-dashboard.component';
import { ViewMentorProfileComponent } from './hr/profile/view-mentor-profile/view-mentor-profile.component';

const appRoutes: Routes = [
    { path: 'courses', 
      component: CoursesDashboardComponent,
      data: { title: 'Courses Dashboard' } 
    },
    { path: 'profile', 
      component: ProfileComponent, 
      data: { title: 'Your Profile' }
    },
    { path: 'profile/:id', 
    component: ViewMentorProfileComponent, 
    data: { title: 'Mentor Profile' }
    },
    { path: 'admin', component: AdminComponent },
    { path: '',
      redirectTo: '/courses',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }