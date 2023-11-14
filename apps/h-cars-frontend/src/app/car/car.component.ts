// car.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  isNewCar = false;
  activeTab: 'allCars' | 'myCars' = 'allCars';

  carForm: FormGroup;

  constructor(private carService: CarService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      carModel: [''],
      // Add other form controls for your Car model
    });
  }

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

  onSelectCar(car: Car): void {
    this.selectedCar = { ...car };
    this.isNewCar = false;
    this.carForm.patchValue(this.selectedCar);
  }

  onCreateCar(): void {
    this.selectedCar = null;
    this.isNewCar = true;
    this.carForm.reset();
  }

  saveCar(): void {
    const formData = this.carForm.value;

    if (this.isNewCar) {
      this.carService.createCar(formData).subscribe(() => {
        this.loadCars();
      });
    } else {
      if (this.selectedCar) {
        this.carService.updateCar(this.selectedCar._id!, formData).subscribe(() => {
          this.loadCars();
        });
      }
    }

    this.selectedCar = null;
    this.isNewCar = false;
    this.carForm.reset();
  }

  onUpdateCar(myCar: Car): void {
    this.onSelectCar(myCar);
  }

  onDeleteCar(id: string): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.loadMyCars();
      this.selectedCar = null;
      this.carForm.reset();
    });
  }
}
