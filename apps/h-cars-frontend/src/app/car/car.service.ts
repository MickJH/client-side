import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/car/all-cars`, { headers });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/car/id/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/car/create-car`, car);
  }

  updateCar(id: string, car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/car/update-car/${id}`, car);
  }

  deleteCar(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/car/delete-car/${id}`, {});
  }

   // New function to get user-specific cars
   getUserCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/car/my-cars`, { headers });
  }
}
