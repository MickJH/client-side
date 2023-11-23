import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  productForm: FormGroup;
  product: Product | null = null;
  isProductOwner = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      createdAt: [new Date()],
    });
  }

  ngOnInit(): void {
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

  updateProduct(): void {
    if (this.productForm.valid && this.product) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.productService
        .updateProduct(this.product.id!, updatedProduct)
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
