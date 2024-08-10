import { HttpClient } from '@angular/common/http';
import { createEnvironmentInjector, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartApiService {

/*Start Add Order To BackEnd */

  constructor(private http:HttpClient) { }
  creatNewCart(model:any){
    return this.http.post('https://fakestoreapi.com/carts' , model)
  }

  /*End Add Order To BackEnd */

}
