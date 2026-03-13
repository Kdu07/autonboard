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
  encapsulation: ViewEncapsulation.None
})
export class Upload {

  progresso: number = 0;
  arquivoSelecionado: File | null = null;
  estaEnviando: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      this.arquivoSelecionado = file;
      this.progresso = 0;
    }
  }

  fazerUpload() {
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
      .post('http://localhost:3000/upload', formData, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progresso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
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

