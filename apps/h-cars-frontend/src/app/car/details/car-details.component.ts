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
  offerAmount = 0;
  currentOffers: any[] = [];

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
          this.fetchOffersForCar(carId);
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

  placeOffer(): void {
    if (this.car) {
      // Assume a method in CarService to submit the offer
      if (this.car && this.car._id) {
        this.carService.placeOffer(this.car._id, this.offerAmount).subscribe(
          () => {
            this.errorMessage = 'Offer placed successfully!';
            this.offerAmount = 0;
          },
          (error) => {
            if (
              error.status === 400 &&
              error.error.message === 'missing parameters'
            ) {
              this.displayErrorMessage('Missing parameters');
            } else if (
              error.status === 404 &&
              error.error.message === 'car not found'
            ) {
              this.displayErrorMessage('Car not found');
            } else {
              this.displayErrorMessage(
                'Unexpected error during offer placement'
              );
            }
          }
        );
      }
    }
  }

  fetchOffersForCar(carId: string): void {
    console.log('Fetching offers for car with id: ', carId);
    this.carService.getOffersForCar(carId).subscribe(
      (offers) => {
        this.currentOffers = offers;
        console.log(offers);
      },
      (error) => {
        this.displayErrorMessage('Failed to load offers.');
      }
    );
  }

  private displayErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}
