import { Routes } from '@angular/router';
import { Landingpage } from './landingpage/landingpage';
import { Upload } from './upload/upload';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Landingpage
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
