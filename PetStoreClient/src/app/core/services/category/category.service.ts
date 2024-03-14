import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SERVER_URL } from '../../../app.config';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    @Inject(SERVER_URL) private baseUrl: string
  ) {}
  getAllCategories(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + 'Category')
      .pipe(map((response) => response));
  }
  getProductsByCategory(category: string): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.baseUrl + 'Category/' + category)
      .pipe(map((response) => response));
  }
}
