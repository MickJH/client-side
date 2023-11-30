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
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product/create/product-create.component';
import { ProductUpdateComponent } from './product/update/product-update.component';
import { ProductDeleteComponent } from './product/delete/product-delete.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export const appRoutes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'about', component: AboutComponent },
  //Car
  { path: 'car', component: CarComponent, canActivate: [AuthGuard] },
  {
    path: 'car/details/:id',
    component: CarDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'car/create',
    component: CarCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'car/update/:id',
    component: CarUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'car/delete/:id',
    component: CarDeleteComponent,
    canActivate: [AuthGuard],
  },
  //Product
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/update/:id',
    component: ProductUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/delete/:id',
    component: ProductDeleteComponent,
    canActivate: [AuthGuard],
  },
  //User
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
