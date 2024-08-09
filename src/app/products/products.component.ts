import { Component, EventEmitter, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductIntrface } from '../product-intrface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    LoaderComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit, OnDestroy{

  products: ProductIntrface[] = [];
  cartProducts:any[]=[]
  x: Subscription = new Subscription();
  constructor(private _productsService: ProductsService){

  }

  //without using constructor
ngOnInit(): void {
  this.getProducts();
}

  getProducts(){
    this.x.add(
      this._productsService.getProducts().subscribe({
        next: (res) =>{
          this.products = res;
          console.log(res)
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("Completed");
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.x.unsubscribe()
  }

  addToCart(event:any){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("Product is already in your cart")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }
  }

}
