import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'client-side-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
}
