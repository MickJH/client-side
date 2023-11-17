import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CarComponent } from './car/car.component';
import { CarDetailsComponent } from './car/details/car-details.component';
import { CarCreateComponent } from './car/create/car-create.component';
import { CarUpdateComponent } from './car/update/car-update.component';
import { CarDeleteComponent } from './car/delete/car-delete.component';
import { AuthGuard } from './auth/auth-guard.service';

export const appRoutes: Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'car', component: CarComponent, canActivate: [AuthGuard]},
  {path: 'car/details/:id', component: CarDetailsComponent, canActivate: [AuthGuard]},
  {path: 'car/create', component: CarCreateComponent, canActivate: [AuthGuard]},
  {path: 'car/update/:id', component: CarUpdateComponent, canActivate: [AuthGuard]},
  {path: 'car/delete/:id', component: CarDeleteComponent, canActivate : [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
