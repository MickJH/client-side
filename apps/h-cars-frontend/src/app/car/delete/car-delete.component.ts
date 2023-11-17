import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  car: Car | null = null;
  isCarOwner = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

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

  deleteCar(): void {
    if (this.isCarOwner && this.car) {
      this.carService.deleteCar(this.car._id!).subscribe(
        () => {
          // Car delete successful
          this.router.navigate(['/car']);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error deleting car:', error);
        }
      );
    } else {
      // Redirect or show a no permission message
      setTimeout(() => {
        this.router.navigate(['/car']);
      }, 2000);
    }
  }
}
