import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'client-side-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailError = '';
  passwordError = '';
  generalError = '';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  formData: { email: string; password: string } = { email: '', password: '' };

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      // The form is valid, proceed with login
      const formData = this.loginForm.value;
  
      // Reset error messages
      this.emailError = '';
      this.passwordError = '';
      this.generalError = '';
  
      // Call the AuthService.login() method to send the login request to the backend
      this.authService.login(formData).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/car']);
        },
        (error) => {
          if (error.status === 400 && error.error.message === 'invalid credentials') {
            this.passwordError = 'Invalid email or password';
          } else if (error.status === 400 && error.error.message === 'user doesnt exist') {
            this.emailError = 'User doesn\'t exist';
          } else {
            this.generalError = 'Unexpected error during login';
          }
        }
      );
    } else {
      // The form is invalid, show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
  
}
