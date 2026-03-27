import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { Upload } from './upload/upload';
import { Landingpage } from './landingpage/landingpage';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Landingpage
  },
  {
<<<<<<< HEAD
    path: 'upload',
    component: Upload
=======
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: Upload,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
>>>>>>> develop
  }
];
