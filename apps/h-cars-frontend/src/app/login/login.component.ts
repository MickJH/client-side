import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'client-side-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData: { email: string; password: string } = { email: '', password: '' };

  login() {
    // Implement your login logic here
    console.log('Form data:', this.formData);
    // You can call AuthService.login() here to send the login request to the backend
  }
}
