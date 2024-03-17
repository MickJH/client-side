import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { Car } from '../../car/car.model';
import { CarService } from '../../car/car.service';

@Component({
  selector: 'client-side-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  productForm: FormGroup;
  product: Product | null = null;
  isProductOwner = false;
  cars: Car[] = [];
  isUniversal = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private carService: CarService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      car: ['', Validators.required],
      isUniversal: [false],
      createdAt: [new Date()],
    });
  }

  ngOnInit(): void {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });

    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;

          // Check if the current user is the creator of the product
          this.authService.getCurrentUser().subscribe((user) => {
            if (user && product.userEmail === user.email) {
              this.isProductOwner = true;
              // Patch the form with existing product details
              this.productForm.patchValue({
                productName: product.productName,
                price: product.price,
                description: product.description,
                imageUrl: product.imageUrl,
                category: product.category,
                brand: product.brand,
                createdAt: product.createdAt,
                userEmail: product.userEmail,
                car: product.car,
              });
            } else {
              // Redirect or show an error message indicating the user doesn't have permission
              setTimeout(() => {
                this.router.navigate(['/product']);
              }, 2000);
            }
          });
        });
      }
    });
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

  updateProduct(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      this.productService
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .updateProduct(this.product._id!, updatedProduct)
        .subscribe(
          () => {
            // Product update successful
            this.router.navigate(['/product']);
          },
          (error) => {
            // Handle error, e.g., display an error message
            console.error('Error updating product:', error);
          }
        );
    }
  }
}
