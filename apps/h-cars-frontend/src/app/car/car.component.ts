// car.component.ts
import { Component, OnInit } from '@angular/core';
import { Car } from './car.model';
import { CarService } from './car.service';

@Component({
  selector: 'client-side-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  myCars: Car[] = [];
  selectedCar: Car | null = null;
  activeTab: 'allCars' | 'myCars' | 'likedCars' = 'allCars';
  errorMessage = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.showAllCars();
  }

  showAllCars(): void {
    this.activeTab = 'allCars';
    this.loadCars();
  }

  showMyCars(): void {
    this.activeTab = 'myCars';
    this.loadMyCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  loadMyCars(): void {
    this.carService.getUserCars().subscribe((myCars) => {
      this.myCars = myCars;
    });
  }

  showLikedCars(): void {
    this.carService.getLikedCars().subscribe((cars) => {
      this.activeTab = 'likedCars';
      this.cars = cars;
    });
  }
}
