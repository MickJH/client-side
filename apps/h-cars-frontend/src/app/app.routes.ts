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

export const appRoutes: Routes = [
  {path: '', component: AppComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'car', component: CarComponent},
  {path: 'car/details/:id', component: CarDetailsComponent},
  {path: 'car/create', component: CarCreateComponent},
  {path: 'car/update/:id', component: CarUpdateComponent},
  {path: 'car/delete/:id', component: CarDeleteComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
