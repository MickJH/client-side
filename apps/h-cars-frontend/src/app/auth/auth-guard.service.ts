// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          // User is authenticated, allow access
          return true;
        } else {
          // User is not authenticated, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        // Handle error, for example, redirect to login page
        this.router.navigate(['/login']);
        return of(false); 
      })
    );
  }
}
