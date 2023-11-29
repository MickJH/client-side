import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car.model';
import { CarService } from '../car.service';

@Component({
  selector: 'client-side-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null;
  errorMessage = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const carId = params.get('id');
      if (carId) {
        this.carService.getCarById(carId).subscribe((car) => {
          this.car = car;
        });
      }
    });
  }

  updateCar(): void {
    if (this.car) {
      this.router.navigate(['/car/update', this.car._id]);
    }
  }

  deleteCar(): void {
    if (this.car) {
      this.router.navigate(['/car/delete', this.car._id]);
    }
  }

<<<<<<< HEAD
  likeCar(carId: string): void {
    this.carService.likeCar(carId).subscribe(
      () => {
        this.errorMessage = 'Car liked successfully';
      },
      (error) => {
        if (
          error.status === 400 &&
          error.error.message === 'missing parameters'
        ) {
          this.displayErrorMessage('Missing parameters');
        } else if (
          error.status === 404 &&
          error.error.message === 'user doesnt exist'
        ) {
          this.displayErrorMessage('User not found');
        } else if (
          error.status === 404 &&
          error.error.message === 'product not found'
        ) {
          this.displayErrorMessage('Car not found');
        } else if (
          error.status === 400 &&
          error.error.message === 'You have already liked this car'
        ) {
          this.displayErrorMessage('You have already liked this car');
        } else {
          this.displayErrorMessage('Unexpected error during like operation');
        }
      }
    );
  }

  private displayErrorMessage(message: string): void {
    this.errorMessage = message;
=======
  toggleLike(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.carService.likeCar(this.car!._id!).subscribe((updatedCar) => {
      this.car = updatedCar;
    });
>>>>>>> 5c0351251115102ba2b39c0f09d7a99a2c660da6
  }
}
