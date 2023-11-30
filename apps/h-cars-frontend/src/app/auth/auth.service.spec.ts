import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser = {
      email: 'holstermick@gmail.com',
      password: 'password123',
      age: 19,
      firstName: 'Mick',
      lastName: 'Holster',
    };
    const mockResponse = { token: 'mockToken' };

    authService.register(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${authService.apiUrl}/auth/register`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log in a user', () => {
    const mockCredentials = {
      email: 'holstermick@gmail.com',
      password: 'password123',
    };
    const mockResponse = { token: 'mockToken' };

    authService.login(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${authService.apiUrl}/auth/login`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
