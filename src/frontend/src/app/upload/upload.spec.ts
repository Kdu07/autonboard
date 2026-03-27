import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { Upload } from './upload';

describe('Upload', () => {
  let component: Upload;
  let fixture: ComponentFixture<Upload>;
  
  const mockAuthService = {
    getAccessTokenSilently: () => of('mock-token'),
    logout: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Upload],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Upload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format file size correctly', () => {
    expect(component.formatSize(500)).toBe('500 B');
    expect(component.formatSize(1024)).toBe('1.0 KB');
    expect(component.formatSize(1024 * 1024)).toBe('1.0 MB');
  });

  it('should return correct file icons', () => {
    expect(component.getFileIcon('test.csv')).toBe('CSV');
    expect(component.getFileIcon('test.xlsx')).toBe('XLS');
    expect(component.getFileIcon('test.pdf')).toBe('PDF');
    expect(component.getFileIcon('test.txt')).toBe('FILE');
  });

  it('should return correct icon classes', () => {
    expect(component.getFileIconClass('test.csv')).toBe('csv');
    expect(component.getFileIconClass('test.xlsx')).toBe('xlsx');
    expect(component.getFileIconClass('test.pdf')).toBe('pdf');
    expect(component.getFileIconClass('test.unknown')).toBe('other');
  });

  it('should handle dragging state', () => {
    const event = { preventDefault: vi.fn() } as unknown as DragEvent;
    component.onDragOver(event);
    expect(component.isDragging).toBe(true);
    expect(event.preventDefault).toHaveBeenCalled();

    component.onDragLeave();
    expect(component.isDragging).toBe(false);
  });
});