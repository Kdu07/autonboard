import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      this.arquivoSelecionado = file;
      this.progresso = 0;
    }
  }

  fazerUpload() {

    if (!this.arquivoSelecionado || this.estaEnviando) {

      Swal.fire({
        icon: 'warning',
        title: 'Arquivo não selecionado',
        text: 'Selecione um arquivo antes de fazer upload.'
      });

      return;
    }

    const formData = new FormData();
    formData.append('file', this.arquivoSelecionado);
    formData.append('customer_id', '1');
    formData.append('status', 'pending');

    this.estaEnviando = true;
    this.progresso = 0;

    const apiUrl = `http://${window.location.hostname}:3000/upload`;

    this.http
      .post(apiUrl, formData, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe({
        next: (event) => {

          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progresso = Math.round((event.loaded / event.total) * 100);
          }

          else if (event.type === HttpEventType.Response) {

            this.estaEnviando = false;

            Swal.fire({
              icon: 'success',
              title: 'Upload concluído',
              text: 'O arquivo foi enviado com sucesso!',
              confirmButtonText: 'OK'
            });

          }
        },

        error: (err) => {

          this.estaEnviando = false;

          const mensagemErro =
            err?.error?.message ||
            err?.error?.erro ||
            err?.message ||
            'Erro desconhecido ao enviar o arquivo.';

          Swal.fire({
            icon: 'error',
            title: 'Erro no upload',
            text: mensagemErro,
            footer: 'Verifique o servidor ou tente novamente.'
          });

        }
      });
  }

}