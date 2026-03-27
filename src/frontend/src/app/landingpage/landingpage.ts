import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [RouterModule],
=======
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, RouterLink],
>>>>>>> develop
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.css',
})
export class Landingpage {
  constructor(private auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' }
    });
  }
}
