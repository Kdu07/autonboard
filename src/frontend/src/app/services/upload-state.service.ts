import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  statusText?: string;
  submissionId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {
  private uploadedFilesSubject = new BehaviorSubject<UploadedFile[]>([]);
  public uploadedFiles$: Observable<UploadedFile[]> = this.uploadedFilesSubject.asObservable();

  addFile(file: UploadedFile): void {
    this.uploadedFilesSubject.next([...this.uploadedFilesSubject.value, file]);
  }

  updateFile(index: number, updates: Partial<UploadedFile>): void {
    const current = this.uploadedFilesSubject.value;
    if (index >= 0 && index < current.length) {
      const updated = [...current];
      updated[index] = { ...updated[index], ...updates };
      this.uploadedFilesSubject.next(updated);
    }
  }

  getFiles(): UploadedFile[] {
    return this.uploadedFilesSubject.value;
  }

  clearFiles(): void {
    this.uploadedFilesSubject.next([]);
  }

  removeFile(index: number): void {
    const current = this.uploadedFilesSubject.value;
    if (index >= 0 && index < current.length) {
      this.uploadedFilesSubject.next(current.filter((_, i) => i !== index));
    }
  }
}
