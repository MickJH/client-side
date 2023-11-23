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
  selectedProduct: Product | null = null;
  activeTab: 'allProducts' | 'myProducts' = 'allProducts';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.showAllProducts();
  }

  showAllProducts(): void {
    this.activeTab = 'allProducts';
    this.loadProducts();
  }

  showMyProducts(): void {
    this.activeTab = 'myProducts';
    this.loadMyProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  loadMyProducts(): void {
    this.productService.getUserProducts().subscribe((myProducts) => {
      this.myProducts = myProducts;
    });
  }
}
