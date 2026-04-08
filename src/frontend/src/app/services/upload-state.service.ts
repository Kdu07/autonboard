import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  statusText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {
  private uploadedFilesSubject = new BehaviorSubject<UploadedFile[]>([]);
  public uploadedFiles$: Observable<UploadedFile[]> = this.uploadedFilesSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Add a new file to the upload list
   */
  addFile(file: UploadedFile): void {
    const currentFiles = this.uploadedFilesSubject.value;
    const updatedFiles = [...currentFiles, file];
    this.uploadedFilesSubject.next(updatedFiles);
    this.saveToLocalStorage(updatedFiles);
  }

  /**
   * Update an existing file's progress/status
   */
  updateFile(index: number, updates: Partial<UploadedFile>): void {
    const currentFiles = this.uploadedFilesSubject.value;
    if (index >= 0 && index < currentFiles.length) {
      const updatedFiles = [...currentFiles];
      updatedFiles[index] = { ...updatedFiles[index], ...updates };
      this.uploadedFilesSubject.next(updatedFiles);
      this.saveToLocalStorage(updatedFiles);
    }
  }

  /**
   * Get current list of files
   */
  getFiles(): UploadedFile[] {
    return this.uploadedFilesSubject.value;
  }

  /**
   * Clear all files from the list
   */
  clearFiles(): void {
    this.uploadedFilesSubject.next([]);
    localStorage.removeItem('uploadedFiles');
  }

  /**
   * Remove a specific file by index
   */
  removeFile(index: number): void {
    const currentFiles = this.uploadedFilesSubject.value;
    if (index >= 0 && index < currentFiles.length) {
      const updatedFiles = currentFiles.filter((_, i) => i !== index);
      this.uploadedFilesSubject.next(updatedFiles);
      this.saveToLocalStorage(updatedFiles);
    }
  }

  /**
   * Save file metadata to localStorage (excluding the actual File object)
   */
  private saveToLocalStorage(files: UploadedFile[]): void {
    try {
      // Don't store the actual File object, just metadata
      const metadata = files.map(f => ({
        fileName: f.file.name,
        fileSize: f.file.size,
        progress: f.progress,
        status: f.status,
        statusText: f.statusText
      }));
      localStorage.setItem('uploadedFiles', JSON.stringify(metadata));
    } catch (error) {
      console.warn('Failed to save upload state to localStorage:', error);
    }
  }

  /**
   * Load file metadata from localStorage
   * Note: The actual File objects won't be restored, just the metadata
   */
  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem('uploadedFiles');
      if (stored) {
        const metadata = JSON.parse(stored);
        // Only restore if files were completed or in error state
        const completedFiles = metadata.filter(
          (m: any) => m.status === 'done' || m.status === 'error'
        );
        
        if (completedFiles.length > 0) {
          // Restore as display-only entries (no File object)
          const restoredFiles: UploadedFile[] = completedFiles.map((m: any) => ({
            file: new File([], m.fileName),
            progress: m.progress,
            status: m.status,
            statusText: m.statusText
          }));
          this.uploadedFilesSubject.next(restoredFiles);
        }
      }
    } catch (error) {
      console.warn('Failed to load upload state from localStorage:', error);
    }
  }
}
