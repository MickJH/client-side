import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './auth.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  checkEmailAvailability(email: string): Observable<{ isAvailable: boolean }> {
    return this.http.get<{ isAvailable: boolean }>(`${this.apiUrl}/auth/check-email/${email}`);
  }
  
}
