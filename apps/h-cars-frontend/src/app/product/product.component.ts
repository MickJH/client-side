import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'client-side-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  myProducts: Product[] = [];
  likedProducts: Product[] = [];
  selectedProduct: Product | null = null;
  activeTab: 'allProducts' | 'myProducts' | 'likedProducts' = 'allProducts';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.showAllProducts();
  }

  showAllProducts(): void {
    this.activeTab = 'allProducts';
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  showMyProducts(): void {
    this.activeTab = 'myProducts';
    this.productService.getUserProducts().subscribe((myProducts) => {
      this.myProducts = myProducts;
    });
  }

  showLikedProducts(): void {
    this.activeTab = 'likedProducts';
    this.productService.getLikedProducts().subscribe((likedProducts) => {
      this.likedProducts = likedProducts;
    });
  }
}
