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
<<<<<<< HEAD
    path: 'upload',
    component: Upload
=======
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'upload',
    component: Upload
  },
  {
<<<<<<< HEAD
    path: '**',
    redirectTo: ''
>>>>>>> develop
=======
    path: 'profile',
    component: Profile
>>>>>>> f59500ed9fff2ab96028d9e5e7a5fe691f32324f
  }
];