import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Profile } from './profile';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let httpMock: HttpTestingController;
  
  const mockUser = { name: 'Test User', email: 'test@example.com' };
  const mockAuthService = {
    user$: of(mockUser),
    getAccessTokenSilently: () => of('mock-token'),
    logout: vi.fn()
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should save company data successfully', () => {
    component.companyForm = {
      name: 'Test Corp',
      cnpj: '123456789',
      address: 'Test St',
      phone: '12345678',
      plan: 'pro'
    };

    component.saveCompany();
    
    const req = httpMock.expectOne('/api/profile');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });

    expect(component.isSaving).toBe(false);
    expect(component.saveSuccess).toBe(true);
    
    vi.advanceTimersByTime(5000);
    expect(component.saveSuccess).toBe(false);
  });

  it('should handle save error', () => {
    component.saveCompany();
    
    const req = httpMock.expectOne('/api/profile');
    req.error(new ErrorEvent('Network error'), { status: 500, statusText: 'Server Error' });

    expect(component.isSaving).toBe(false);
    expect(component.saveError).toBe('Failed to save. Please try again.');
    
    vi.advanceTimersByTime(6000);
    expect(component.saveError).toBeNull();
  });
});
