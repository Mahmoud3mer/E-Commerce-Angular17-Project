import { Component, EventEmitter, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductIntrface } from '../product-intrface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription } from 'rxjs';
import { style } from '@angular/animations';
import { AlertComponent, AlertModule } from '@coreui/angular';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    LoaderComponent,AlertModule,AlertComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit, OnDestroy{

  products: ProductIntrface[] = [];
  cartProducts:any[]=[]
  wishProducts:any[]=[]
  alertcart:boolean=true;
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
        alert("Product is already in your cart");

      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))

    }

  }

  addTowish(event:any){
    if("wish" in localStorage) {
      this.wishProducts = JSON.parse(localStorage.getItem("wish")!)
      let existt = this.wishProducts.find(item => item.item.id == event.item.id)
      if(existt) {
        alert("Product is already in your wish")
      }else {
        this.wishProducts.push(event)
        localStorage.setItem("wish" , JSON.stringify(this.wishProducts))
      }
    } else {
      this.wishProducts.push(event)
      localStorage.setItem("wish" , JSON.stringify(this.wishProducts))
    }
  }

}
