import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Car } from '../car/car.model';
import { CarService } from '../car/car.service';

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
  cars: Car[] = [];
  activeTab: 'allProducts' | 'myProducts' | 'likedProducts' = 'allProducts';

  constructor(
    private productService: ProductService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.showAllProducts();
    this.loadCars();
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

  loadCars(): void {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  getCarModel(carId: string): string {
    const car = this.cars.find((c) => c._id === carId);
    return car ? car.carModel : 'Universal';
  }
}
