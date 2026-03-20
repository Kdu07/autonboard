import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  // Disable style encapsulation to allow global styles to affect this component if needed
  encapsulation: ViewEncapsulation.None
})
export class Upload {

  // State management for UI progress and file handling
  progresso: number = 0;
  arquivoSelecionado: File | null = null;
  estaEnviando: boolean = false;

  constructor(private http: HttpClient) {}

  /**
   * Capture the file from the input change event
   */
  onFileSelected(event: any) {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      this.arquivoSelecionado = file;
      this.progresso = 0;
    }
  }

  /**
   * Handles the multipart/form-data submission with progress tracking
   */
  fazerUpload() {
    // Guard clause to prevent empty uploads or double submissions
    if (!this.arquivoSelecionado || this.estaEnviando) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.arquivoSelecionado);
    formData.append('customer_id', '1');
    formData.append('status', 'pending');

    this.estaEnviando = true;
    this.progresso = 0;

    this.http
      .post('/upload', formData, {
        reportProgress: true, // Enables tracking of upload progress
        observe: 'events'     // Allows us to see interim HttpEvents (like progress)
      })
      .subscribe({
        next: (event) => {
          // Calculate percentage based on bytes loaded vs total size
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progresso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            // Reset state upon successful server response
            this.estaEnviando = false;
            alert('Upload completed successfully!');
          }
        },
        error: (err) => {
          this.estaEnviando = false;
          alert('Upload failed: ' + (err?.message ?? err));
        }
      });
  }

}