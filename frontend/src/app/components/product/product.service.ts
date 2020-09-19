import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products" ;

  constructor(
      private snackBar: MatSnackBar,
      private http: HttpClient) { }

  showMessage(msg: string, isError: Boolean = false): void {
    this.snackBar.open(msg, 'X', 
    {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj), 
      catchError((e)  => this.errorHandle(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: number): Observable<Product> { 
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj), 
      catchError((e)  => this.errorHandle(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj), 
      catchError((e)  => this.errorHandle(e))
    );
  }

  delete(id: number): Observable<Product> { 
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj), 
      catchError((e)  => this.errorHandle(e))
    );
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }
}
