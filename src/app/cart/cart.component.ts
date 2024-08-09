import { Component, EventEmitter, output, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
/* import { ElectronicService } from '../electronic.service'; */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule,ProductsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartProducts:any[]=[];
/*   @Output() item = new EventEmitter; */
@Output() itemn = new EventEmitter;
  total:any=0
  x:any=0
  constructor(){

    this.getCartProducts()
/*     let x = 4.59;
    let z = Math.floor(x);
    console.log("Converted value of " + x + " is " + z); */
  }

  getCartProducts(){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++;

    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }
  minsAmount(index:number){
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }
  detectChange(){
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }
  deleteProduct(index:number){
    this.cartProducts.splice(index,1)
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
  clearCart(){
    this.cartProducts=[]
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
  getCartTotal(){
    this.total=0;
    for(let x in this.cartProducts){
      this.total+=this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }


/*  num(){
    return this.cartProducts.length
  } */

}

