import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { Car } from '../../car/car.model';
import { CarService } from '../../car/car.service';

@Component({
  selector: 'client-side-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  productForm: FormGroup;
  cars: Car[] = [];
  isUniversal = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private carService: CarService
  ) {
    this.productForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      productName: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      car: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      createdAt: [new Date()],
      isUniversal: [false],
    });

    this.authService.getCurrentUser().subscribe((user) => {
      this.productForm.patchValue({
        userEmail: user.email,
      });
    });

    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(
        () => {
          // Product creation successful
          this.router.navigate(['/product']);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error creating product:', error);
        }
      );
    }
  }

  toggleUniversal(): void {
    // Toggle universal flag
    this.isUniversal = !this.isUniversal;
    this.productForm.patchValue({
      car: this.isUniversal ? 'Universal' : '',
    });

    // Disable car selection if universal
    if (this.isUniversal) {
      this.productForm.get('car')?.disable();
    } else {
      this.productForm.get('car')?.enable();
    }
  }
}
