import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Dashboard } from './dashboard/dashboard';
import { Upload } from './upload/upload';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Landingpage
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'upload',
    component: Upload
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: '**',
    redirectTo: ''
  }
];
