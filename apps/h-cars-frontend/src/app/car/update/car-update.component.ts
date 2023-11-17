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
  isCarOwner = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.carForm = this.formBuilder.group({
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

          // Check if the current user is the creator of the car
          this.authService.getCurrentUser().subscribe((user) => {
            if (user && car.userEmail === user.email) {
              this.isCarOwner = true;
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
            } else {
              // Redirect or show an error message indicating the user doesn't have permission
              setTimeout(() => {
                this.router.navigate(['/car']);
              }, 2000);
            }
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
