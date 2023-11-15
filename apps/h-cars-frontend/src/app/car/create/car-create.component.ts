import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent {
  carForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.carForm = this.formBuilder.group({
      userEmail: this.authService.getCurrentUser().subscribe(user => { return user.email }).toString(), 
      carModel: ['', Validators.required],
      imageUrl: ['', Validators.required],
      counter: ['', Validators.required],
      typeOfFuel: ['', Validators.required],
      transmissionType: ['', Validators.required],
      apk: [false],
      apkExpires: [null],
      numberPlate: ['', Validators.required],
      constructionYear: ['', Validators.required],
    });
  }

  createCar(): void {
    if (this.carForm.valid) {
      this.carService.createCar(this.carForm.value).subscribe(
        () => {
          // Car creation successful
          this.router.navigate(['/car']);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error creating car:', error);
        }
      );
    }
  }
}
