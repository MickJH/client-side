import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  register(user: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  checkEmailAvailability(email: string): Observable<{ isAvailable: boolean }> {
    return this.http.get<{ isAvailable: boolean }>(`${this.apiUrl}/auth/check-email/${email}`);
  }

  getCurrentUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/auth/current-user`, { headers });
  }
  
}