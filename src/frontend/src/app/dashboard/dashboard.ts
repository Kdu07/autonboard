import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DashboardData {
  user?: {
    name?: string;
    email?: string;
    auth0_id?: string;
    email_verified?: boolean;
    picture?: string;
  };
  customer?: {
    name?: string;
    cnpj?: string;
    modules?: string[];
    plan?: string;
    status?: string;
  };
  stats?: {
    total?: number;
    pending?: number;
    completed?: number;
    failed?: number;
  };
  submissions?: Array<{
    id?: number;
    filename?: string;
    status?: string;
    created_at?: string;
    file_size?: number;
    file_type?: string;
  }>;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  dashboardData: DashboardData | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.loadDashboard();
      }
    });
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.error = null;

    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.get<DashboardData>('http://localhost:3000/dashboard', { headers }).subscribe({
          next: (data) => {
            this.dashboardData = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Dashboard API error:', err);
            this.tryDebugEndpoint();
          }
        });
      },
      error: () => {
        this.tryDebugEndpoint();
      }
    });
  }

  tryDebugEndpoint(): void {
    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        this.http.get<DashboardData>(`http://localhost:3000/dashboard-debug?auth0_id=${user.sub}`).subscribe({
          next: (data) => {
            this.dashboardData = data;
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Unable to load dashboard data. Please try again.';
            this.isLoading = false;
            console.error('Debug endpoint error:', err);
          }
        });
      } else {
        this.error = 'User not found. Please log in again.';
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-completed';
      case 'pending':   return 'badge-pending';
      case 'failed':    return 'badge-failed';
      default:          return 'badge-pending';
    }
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
