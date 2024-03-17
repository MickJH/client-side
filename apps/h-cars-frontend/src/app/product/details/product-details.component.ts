import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Car } from '../../car/car.model';
import { CarService } from '../../car/car.service';

@Component({
  selector: 'client-side-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  errorMessage = '';
  cars: Car[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.loadCars();

    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
  }

  updateProduct(): void {
    if (this.product) {
      this.router.navigate(['/product/update', this.product._id]);
    }
  }

  deleteProduct(): void {
    if (this.product) {
      this.router.navigate(['/product/delete', this.product._id]);
    }
  }

  likeProduct(carId: string): void {
    this.productService.likeProduct(carId).subscribe(
      () => {
        this.errorMessage = 'Product liked successfully';
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
          this.displayErrorMessage('Product not found');
        } else if (
          error.status === 400 &&
          error.error.message === 'You have already liked this product'
        ) {
          this.displayErrorMessage('You have already liked this product');
        } else {
          this.displayErrorMessage('Unexpected error during like operation');
        }
      }
    );
  }

  private displayErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  getCarModel(carId: string | undefined): string {
    if (!carId) {
      return 'Universal';
    }
    const car = this.cars.find((c) => c._id === carId);
    return car ? car.carModel : 'Universal';
  }
}
