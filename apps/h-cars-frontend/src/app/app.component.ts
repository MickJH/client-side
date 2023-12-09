import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'client-side-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'h-cars-frontend';

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
