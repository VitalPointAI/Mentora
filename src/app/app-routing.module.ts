import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './hr/profile/profile.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: 'hr', component: ProfileComponent },
    { path: 'admin', component: AdminComponent },
    { path: '',
      redirectTo: '/',
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