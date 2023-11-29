// car-details.component.ts
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

  toggleLike(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.carService.likeCar(this.car!._id!).subscribe((updatedCar) => {
      this.car = updatedCar;
    });
  }
}
