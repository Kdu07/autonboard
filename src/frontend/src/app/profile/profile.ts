import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: any = null;

  companyForm = {
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    plan: 'basic'
  };

  isSaving = false;
  saveSuccess = false;
  saveError: string | null = null;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  saveCompany(): void {
    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = null;

    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.post('http://localhost:3000/profile', this.companyForm, { headers })
          .subscribe({
            next: () => {
              this.isSaving = false;
              this.saveSuccess = true;
              setTimeout(() => this.saveSuccess = false, 5000);
            },
            error: (err) => {
              this.isSaving = false;
              this.saveError = err?.error?.message || 'Failed to save. Please try again.';
              setTimeout(() => this.saveError = null, 6000);
            }
          });
      },
      error: () => {
        this.isSaving = false;
        this.saveError = 'Authentication error. Please log in again.';
        setTimeout(() => this.saveError = null, 6000);
      }
    });
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
