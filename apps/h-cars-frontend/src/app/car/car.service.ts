import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://h-cars-backend.azurewebsites.net/api';

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
    return this.http.get<Car[]>(`http://localhost:3000/api/car/all-cars`, {
      headers,
    });
  }

  getCarById(id: string): Observable<Car> {
    const headers = this.getHeaders();
    return this.http.get<Car>(`http://localhost:3000/api/car/id/${id}`, {
      headers,
    });
  }

  createCar(car: Car): Observable<Car> {
    const headers = this.getHeaders();
    return this.http.post<Car>(`${this.apiUrl}/car/create-car`, car, {
      headers,
    });
  }

  updateCar(id: string, car: Car): Observable<Car> {
    const headers = this.getHeaders();
    return this.http.post<Car>(`${this.apiUrl}/car/update-car/${id}`, car, {
      headers,
    });
  }

  deleteCar(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      `${this.apiUrl}/car/delete-car/${id}`,
      {},
      { headers }
    );
  }

  getUserCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/car/my-cars`, { headers });
  }

  likeCar(carId: string): Observable<Car> {
    const headers = this.getHeaders();
    const body = { carId };
    return this.http.post<Car>(
      `http://localhost:3000/api/user/like-car`,
      body,
      { headers }
    );
  }

  getLikedCars(): Observable<Car[]> {
    const headers = this.getHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/user/liked-cars`, { headers });
  }
}
