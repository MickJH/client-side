import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from './product.model';
import { Car } from '../car/car.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://h-cars-backend.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/product/all-products`, {
      headers,
    });
  }

  getProductById(id: string): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.apiUrl}/product/id/${id}`, {
      headers,
    });
  }

  createProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(
      `${this.apiUrl}/product/create-product`,
      product,
      {
        headers,
      }
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(
      `${this.apiUrl}/product/update-product/${id}`,
      product,
      {
        headers,
      }
    );
  }

  deleteProduct(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      `${this.apiUrl}/product/delete-product/${id}`,
      {},
      { headers }
    );
  }

  getUserProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/product/my-products`, {
      headers,
    });
  }

  likeProduct(productId: string): Observable<Product> {
    const headers = this.getHeaders();
    const body = { productId };
    return this.http.post<Product>(`${this.apiUrl}/user/like-product`, body, {
      headers,
    });
  }

  getLikedProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/user/liked-products`, {
      headers,
    });
  }
}
