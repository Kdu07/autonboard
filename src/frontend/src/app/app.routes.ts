import { Routes } from '@angular/router';
import { Upload } from './upload/upload';
import { Landingpage } from './landingpage/landingpage';

export const routes: Routes = [
  {
    path: 'Landingpage',
    component: Landingpage
  },
  {
    path: '',
    component: Upload
  }
];


 



