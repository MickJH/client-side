import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  { path: '', component: AppComponent }, // Define a landing page component
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  // Add more routes for other pages if necessary
];
