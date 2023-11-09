// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'client-side-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  emailError = '';
  generalError = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
    });
  }
  


  register() {
    if (this.registrationForm.valid) {
      // The form is valid, proceed with registration
      const formData = this.registrationForm.value;
      console.log('Registration form data:', formData);

       // Reset error messages
       this.emailError = '';
       this.generalError = '';
  
      // Call the AuthService.register() method to send the registration request to the backend
      this.authService.register(formData).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 400 && error.error.message === 'user already exists') {
            this.emailError = 'Email is already in use';
          } else {
            this.generalError = 'Unexpected error during registration';
          }
        }
      );
    } else {
      // The form is invalid, show validation errors
      this.registrationForm.markAllAsTouched();
    }
  }
}
