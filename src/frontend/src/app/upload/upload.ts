<<<<<<< HEAD
import { Component, ViewEncapsulation, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
=======
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
>>>>>>> 75d6773470f4cef4acaaf2644bae1351918e93b2
import { RouterLink } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
}

interface ServerFile {
  id: number;
  customer_id: number;
  customer_name: string;
  status: string;
  file_type: string;
  file_name: string;
  upload_date: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  encapsulation: ViewEncapsulation.None
})
export class Upload {
  isDragging = false;
  uploadedFiles: UploadedFile[] = [];
<<<<<<< HEAD
  serverFiles: ServerFile[] = [];
  customerId: number | null = null;
  customerName: string | null = null;
  isProfileLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private uploadStateService: UploadStateService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServerFiles();

    // Subscribe to uploaded files from the service
    this.ngZone.run(() => {
      this.uploadStateService.uploadedFiles$
        .pipe(takeUntil(this.destroy$))
        .subscribe(files => {
          this.uploadedFiles = [...files].reverse();
          this.cdr.detectChanges();
        });
    });

    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user?.email) {
        this.fetchUserProfile(user.email, user.name ?? undefined);
      } else {
        console.warn('No user email found for profile lookup.');
        this.isProfileLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchUserProfile(email: string, name?: string): void {
    this.isProfileLoading = true;
    const params = new URLSearchParams({ email });
    if (name) params.set('name', name);
    this.http.get<any>(`http://localhost:3000/user/profile?${params.toString()}`).subscribe({
      next: (data) => {
        this.customerId = data.customer_id;
        this.customerName = data.customer_name;
        this.isProfileLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch user profile:', err);
        this.isProfileLoading = false;
        if (err.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Perfil não encontrado',
            text: 'Nenhuma conta de cliente foi encontrada para este usuário. Entre em contato com o administrador.'
          });
        } else if (err.status === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Erro de conexão',
            text: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente recarregar a página.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar perfil',
            text: 'Não foi possível carregar as informações do seu perfil. Tente recarregar a página.'
          });
        }
      }
    });
  }
=======

  constructor(private http: HttpClient, public auth: AuthService) {}
>>>>>>> 75d6773470f4cef4acaaf2644bae1351918e93b2

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
    formData.append('customer_id', '1'); // Temporário para evitar erro 400

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    this.http.post('/api/upload', formData, {
      headers: new HttpHeaders(headers),
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          entry.progress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
<<<<<<< HEAD
          this.uploadStateService.removeFile(fileIndex);
          this.loadServerFiles();
=======
          entry.status = 'done';
          entry.progress = 100;
>>>>>>> 75d6773470f4cef4acaaf2644bae1351918e93b2
        }
      },
      error: (err) => {
        entry.status = 'error';
        const msg = err?.error?.message || err?.error?.erro || 'Upload failed.';
        Swal.fire({ icon: 'error', title: 'Upload Error', text: msg });
      }
    });
  }

  private loadServerFiles(): void {
    this.http.get<ServerFile[]>('http://localhost:3000/').subscribe({
      next: (files) => { this.serverFiles = files; this.cdr.detectChanges(); },
      error: (err) => console.error('Failed to load server files:', err)
    });
  }

  downloadFile(id: number): void {
    const a = document.createElement('a');
    a.href = `http://localhost:3000/download/${id}`;
    a.click();
  }

  getFileIconFromMime(mimeType: string): string {
    if (mimeType === 'text/csv') return 'CSV';
    if (mimeType === 'application/vnd.ms-excel') return 'XLS';
    if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'XLS';
    return 'FILE';
  }

  getFileIconClassFromMime(mimeType: string): string {
    if (mimeType === 'text/csv') return 'csv';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheetml')) return 'xlsx';
    return 'other';
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