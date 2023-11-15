// car-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'client-side-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  carId: string | null = null;
  deletionSuccess = false;

  constructor(private carService: CarService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.carId = params.get('id');
    });
  }

  deleteCar(): void {
    if (this.carId) {
      this.carService.deleteCar(this.carId).subscribe(
        () => {
          // Car deletion successful
          this.deletionSuccess = true;
          // Navigate to car list after a delay to display the success message
          setTimeout(() => {
            this.router.navigate(['/car']);
          }, 2000);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error deleting car:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/car/details', this.carId]);
  }
}
