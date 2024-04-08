import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import your user service
import { User } from '../user.model';
import { CarService } from '../../car/car.service';
import { ProductService } from '../../product/product.service';
import { Car } from '../../car/car.model';
import { Product } from '../../product/product.model';

@Component({
  selector: 'client-side-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  recommendedCars: any[] = [];
  recommendedProducts: any[] = [];

  constructor(
    private userService: UserService,
    private carService: CarService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.user = user;
      this.fetchRecommendedCars();
      this.fetchRecommendedProducts();
    });
  }

  fetchRecommendedCars(): void {
    this.userService.recommendedCars().subscribe(
      (recommendedCarsIds: string[]) => {
        const carIds = recommendedCarsIds.join(',').split(',');
        carIds.forEach((carId: string) => {
          this.carService.getCarById(carId).subscribe(
            (car: Car) => {
              this.recommendedCars.push(car);
            },
            (error) => {
              console.error('Failed to fetch recommended car:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Failed to fetch recommended cars:', error);
      }
    );
  }

  fetchRecommendedProducts(): void {
    this.userService.recommendedProducts().subscribe(
      (recommendedProductsIds: string[]) => {
        const productIds = recommendedProductsIds.join(',').split(',');
        productIds.forEach((productId: string) => {
          this.productService.getProductById(productId).subscribe(
            (product: Product) => {
              this.recommendedProducts.push(product);
            },
            (error) => {
              console.error('Failed to fetch recommended product:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Failed to fetch recommended products:', error);
      }
    );
  }
}
