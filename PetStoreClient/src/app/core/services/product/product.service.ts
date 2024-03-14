import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { CommentModel } from '../../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SERVER_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    @Inject(SERVER_URL) private baseUrl: string
  ) {}

  getProducts(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.baseUrl + 'Product/GetAllProducts')
      .pipe(map((response) => response));
  }

  getProductsByIds(ids: number[]): Observable<ProductModel[]> {
    return this.http
      .post<ProductModel[]>(this.baseUrl + 'Product/GetProductsByIds', ids)
      .pipe(map((response) => response));
  }

  getProduct(productId: string): Observable<ProductModel> {
    return this.http
      .get<ProductModel>(this.baseUrl + 'Product/' + productId)
      .pipe(map((response) => response));
  }
  getComments(productId: string): Observable<CommentModel[]> {
    return this.http
      .get<CommentModel[]>(this.baseUrl + 'Comment/' + productId)
      .pipe(map((response) => response));
  }
  addComment(
    productId: number,
    author: string | null,
    commentMessage: string
  ): Observable<CommentModel> {
    return this.http
      .post<CommentModel>(this.baseUrl + 'Comment', {
        productId,
        author,
        commentMessage,
      })
      .pipe(map((response) => response));
  }
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http
      .post<ProductModel>(this.baseUrl + 'Product/AddProduct', product)
      .pipe(map((response) => response));
  }
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http
      .put<ProductModel>(this.baseUrl + 'Product/UpdateProduct', product)
      .pipe(map((response) => response));
  }
  deleteProduct(productId: number): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + 'Product/' + productId)
      .pipe(map((response) => response));
  }
}
