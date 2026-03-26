import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  encapsulation: ViewEncapsulation.None
})
export class Upload {
  isDragging = false;
  uploadedFiles: UploadedFile[] = [];

  constructor(private http: HttpClient, public auth: AuthService) {}

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
    for (const file of files) {
      const entry: UploadedFile = { file, progress: 0, status: 'uploading' };
      this.uploadedFiles.push(entry);
      this.uploadFile(entry);
    }
  }

  private uploadFile(entry: UploadedFile): void {
    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => this.doUpload(entry, token),
      error: () => this.doUpload(entry, null)
    });
  }

  private doUpload(entry: UploadedFile, token: string | null): void {
    const formData = new FormData();
    formData.append('file', entry.file);
    formData.append('status', 'pending');

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
        } else if (event.type === HttpEventType.Response) {
          entry.status = 'done';
          entry.progress = 100;
        }
      },
      error: (err) => {
        entry.status = 'error';
        const msg = err?.error?.message || err?.error?.erro || 'Upload failed.';
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