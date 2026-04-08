import { Component, ViewEncapsulation, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';
import { UploadStateService, UploadedFile } from '../services/upload-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  encapsulation: ViewEncapsulation.None
})
export class Upload implements OnInit, OnDestroy {
  isDragging = false;
  uploadedFiles: UploadedFile[] = [];
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
      this.uploadStateService.addFile(entry);
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
        if (!fallbackTriggered) this.ngZone.run(() => this.doUpload(entry, token));
      },
      error: (err) => {
        clearTimeout(timeoutId);
        console.warn('Auth0 token failed:', err);
        if (!fallbackTriggered) this.ngZone.run(() => this.doUpload(entry, null));
      }
    });
  }

  private doUpload(entry: UploadedFile, token: string | null): void {
    if (entry.progress > 0) return; // Protect against double trigger
    
    const fileIndex = this.uploadStateService.getFiles().indexOf(entry);
    if (fileIndex === -1) return;

    this.uploadStateService.updateFile(fileIndex, {
      progress: 1,
      statusText: 'Iniciando upload...'
    });

    if (this.customerId === null) {
      this.uploadStateService.updateFile(fileIndex, {
        status: 'error',
        statusText: 'Perfil não carregado.'
      });
      Swal.fire({
        icon: 'error',
        title: 'Perfil não carregado',
        text: 'Não foi possível identificar o seu perfil de cliente. Recarregue a página e tente novamente.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', entry.file);
    formData.append('status', 'pending');
    formData.append('customer_id', this.customerId.toString());

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    this.http.post('http://localhost:3000/upload', formData, {
      headers: new HttpHeaders(headers),
      reportProgress: true,
      observe: 'events'
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const progress = Math.round((event.loaded / event.total) * 100);
          this.uploadStateService.updateFile(fileIndex, {
            progress,
            statusText: `Enviando... ${progress}%`
          });
        } else if (event.type === HttpEventType.Response) {
          this.uploadStateService.updateFile(fileIndex, {
            status: 'done',
            progress: 100,
            statusText: 'Concluído!'
          });
        }
      },
      error: (err) => {
        this.uploadStateService.updateFile(fileIndex, {
          status: 'error',
          statusText: 'Erro no envio.'
        });
        // Handle different error response formats:
        // /upload endpoint returns:       { error: "string" }
        // /upload-excel endpoint returns: { success: false, error: { code, message } }
        const body = err?.error;
        let msg: string;
        if (err.status === 0) {
          msg = 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
        } else if (typeof body?.error === 'object' && typeof body?.error?.message === 'string') {
          msg = body.error.message;
        } else if (typeof body?.error === 'string') {
          msg = body.error;
        } else if (typeof body?.message === 'string') {
          msg = body.message;
        } else {
          msg = 'Erro ao fazer upload. Tente novamente ou contate o suporte.';
        }
        Swal.fire({ icon: 'error', title: 'Erro no Upload', text: msg });
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