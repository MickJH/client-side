import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'client-side-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  product: Product | null = null;
  isProductOwner = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

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
            } else {
              // Redirect or show an error message indicating the user doesn't have permission
              setTimeout(() => {
                this.router.navigate(['/products']);
              }, 2000);
            }
          });
        });
      }
    });
  }

  deleteProduct(): void {
    if (this.isProductOwner && this.product) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.productService.deleteProduct(this.product._id!).subscribe(
        () => {
          // Product delete successful
          this.router.navigate(['/product']);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error deleting product:', error);
        }
      );
    } else {
      // Redirect or show a no permission message
      setTimeout(() => {
        this.router.navigate(['/product']);
      }, 2000);
    }
  }
}
