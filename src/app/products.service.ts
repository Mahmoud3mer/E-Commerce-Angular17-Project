import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  _httpClient = inject(HttpClient)
  
  constructor() { }

  getProducts(): Observable<any>{
    return this._httpClient.get('https://fakestoreapi.com/products');
  }

}
