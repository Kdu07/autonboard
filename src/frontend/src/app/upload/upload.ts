import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


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
  arquivoSelecionado: string | null = null;
  estaEnviando: boolean = false;


  onFileSelected(event: any) {
    const file = event.target.files[0];


    if (file) {
      this.arquivoSelecionado = file.name;
      this.progresso = 0;
    }
  }


  fazerUpload() {


    if (!this.arquivoSelecionado || this.estaEnviando) {
      alert("Please select a file first!");
      return;
    }


    this.estaEnviando = true;
    this.progresso = 0;


    const interval = setInterval(() => {


      this.progresso += 5;


      if (this.progresso >= 100) {
        clearInterval(interval);
        this.estaEnviando = false;
        alert('Upload completed successfully!');
      }


    }, 100);
  }


}

