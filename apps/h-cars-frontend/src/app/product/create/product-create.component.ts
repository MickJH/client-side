import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service'; // Make sure to import the correct service
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      productName: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      createdAt: [new Date()],
    });

    this.authService.getCurrentUser().subscribe((user) => {
      this.productForm.patchValue({
        userEmail: user.email,
      });
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
}
