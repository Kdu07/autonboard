import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { Landingpage } from './landingpage';

describe('Landingpage', () => {
  let component: Landingpage;
  let fixture: ComponentFixture<Landingpage>;
  
  const mockAuthService = {
    loginWithRedirect: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landingpage],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Landingpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on login click', () => {
    component.login();
    expect(mockAuthService.loginWithRedirect).toHaveBeenCalled();
  });
});
