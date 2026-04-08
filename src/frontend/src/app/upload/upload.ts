import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  statusText?: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  encapsulation: ViewEncapsulation.None
})
export class Upload implements OnInit {
  isDragging = false;
  uploadedFiles: UploadedFile[] = [];
  customerId: number | null = null;
  customerName: string | null = null;
  isProfileLoading = true;

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user?.email) {
        this.fetchUserProfile(user.email);
      } else {
        console.warn('No user email found for profile lookup.');
        this.isProfileLoading = false;
      }
    });
  }

  private fetchUserProfile(email: string): void {
    this.isProfileLoading = true;
    this.http.get<any>(`http://localhost:3000/user/profile?email=${email}`).subscribe({
      next: (data) => {
        this.customerId = data.customer_id;
        this.customerName = data.customer_name;
        this.isProfileLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch user profile:', err);
        this.isProfileLoading = false;
        // Optionally handle specific errors like 404
      }
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(Array.from(files));
  }

  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files ?? []);
    this.processFiles(files);
  }

  private processFiles(files: File[]): void {
    if (this.isProfileLoading) {
      Swal.fire({
        icon: 'info',
        title: 'Aguarde',
        text: 'Estamos carregando as suas informações de perfil...'
      });
      return;
    }
    for (const file of files) {
      const isValidType =
        file.type === 'text/csv' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.toLowerCase().endsWith('.csv') ||
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.xls');
        
      if (!isValidType) {
        Swal.fire({
          icon: 'error',
          title: 'Upload Error',
          text: 'Formato inválido. Apenas arquivos CSV ou XLSX são permitidos.'
        });
        continue;
      }

      if (file.size > 100 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Upload Error',
          text: 'Arquivo muito grande. O tamanho máximo permitido é 100MB.'
        });
        continue;
      }

      const entry: UploadedFile = { file, progress: 0, status: 'uploading' };
      this.uploadedFiles.push(entry);
      this.uploadFile(entry);
    }
  }

  private uploadFile(entry: UploadedFile): void {
    entry.statusText = 'Verificando permissões...';
    // If the token takes more than 2 seconds, we move on with null
    let fallbackTriggered = false;
    const fallback = () => {
      if (!fallbackTriggered && entry.status === 'uploading' && entry.progress === 0) {
        fallbackTriggered = true;
        console.warn('Auth0 timeout, triggering fallback...');
        this.doUpload(entry, null);
      }
    };

    const timeoutId = setTimeout(fallback, 2000);

    const token$ = this.auth.getAccessTokenSilently();
    token$.subscribe({
      next: (token) => {
        clearTimeout(timeoutId);
        if(!fallbackTriggered) this.doUpload(entry, token);
      },
      error: (err) => {
        clearTimeout(timeoutId);
        console.warn('Auth0 token failed:', err);
        if(!fallbackTriggered) this.doUpload(entry, null);
      }
    });
  }

  private doUpload(entry: UploadedFile, token: string | null): void {
    if (entry.progress > 0) return; // Protect against double trigger
    entry.progress = 1; 
    entry.statusText = 'Iniciando upload...';

    const formData = new FormData();
    formData.append('file', entry.file);
    formData.append('status', 'pending');
    formData.append('customer_id', this.customerId?.toString() || '1'); 

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    this.http.post('http://localhost:3000/upload', formData, {
      headers: new HttpHeaders(headers),
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          entry.progress = Math.round((event.loaded / event.total) * 100);
          entry.statusText = `Enviando... ${entry.progress}%`;
        } else if (event.type === HttpEventType.Response) {
          entry.status = 'done';
          entry.progress = 100;
          entry.statusText = 'Concluído!';
        }
      },
      error: (err) => {
        entry.status = 'error';
        entry.statusText = 'Erro no envio.';
        let msg = err?.error?.message || err?.error?.error || 'Erro ao fazer upload. Tente novamente ou contate o suporte.';
        Swal.fire({ icon: 'error', title: 'Upload Error', text: msg });
      }
    });
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  getFileIcon(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'csv') return 'CSV';
    if (['xlsx', 'xls'].includes(ext || '')) return 'XLS';
    if (ext === 'pdf') return 'PDF';
    return 'FILE';
  }

  getFileIconClass(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'csv') return 'csv';
    if (['xlsx', 'xls'].includes(ext || '')) return 'xlsx';
    if (ext === 'pdf') return 'pdf';
    return 'other';
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}