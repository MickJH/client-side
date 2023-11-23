import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
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
import { ProductDeleteComponent } from './product/delete/product-delete.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { ProductUpdateComponent } from './product/update/product-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AboutComponent,
    //Car
    CarComponent,
    CarDetailsComponent,
    CarCreateComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    //Product
    ProductComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('AppModule loaded.');
  }
}
