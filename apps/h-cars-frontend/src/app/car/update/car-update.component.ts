import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carForm: FormGroup;
  car: Car | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (carId) {
        this.carService.getCarById(carId).subscribe((car) => {
          this.car = car;

          // Patch the form with existing car details
          this.carForm.patchValue({
            carModel: car.carModel,
            imageUrl: car.imageUrl,
            counter: car.counter,
            typeOfFuel: car.typeOfFuel,
            transmissionType: car.transmissionType,
            apk: car.apk,
            apkExpires: car.apkExpires,
            numberPlate: car.numberPlate,
            constructionYear: car.constructionYear,
          });
        });
      }
    });
  }

  updateCar(): void {
    if (this.carForm.valid && this.car) {
      const updatedCar = { ...this.car, ...this.carForm.value };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.carService.updateCar(this.car._id!, updatedCar).subscribe(
        () => {
          // Car update successful
          this.router.navigate(['/car']);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error updating car:', error);
        }
      );
    }
  }
  
}
