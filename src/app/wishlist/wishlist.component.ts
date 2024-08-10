import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishProducts:any[]=[];
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
    if("wish" in localStorage) {
      this.wishProducts = JSON.parse(localStorage.getItem("wish")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number){
    this.wishProducts[index].quantity++;

    this.getCartTotal();
    localStorage.setItem("wish" , JSON.stringify(this.wishProducts));
  }
  minsAmount(index:number){
    this.wishProducts[index].quantity--;
    if(this.wishProducts[index].quantity<=1){
      this.wishProducts[index].quantity=1
    }
    this.getCartTotal();
    localStorage.setItem("wish" , JSON.stringify(this.wishProducts));
  }
  detectChange(){
    this.getCartTotal();
    localStorage.setItem("wish" , JSON.stringify(this.wishProducts));
  }
  deleteProduct(index:number){
    this.wishProducts.splice(index,1)
    localStorage.setItem("wish" , JSON.stringify(this.wishProducts));
    this.getCartTotal();
  }
  clearCart(){
    this.wishProducts=[]
    localStorage.setItem("wish" , JSON.stringify(this.wishProducts));
    this.getCartTotal();
  }
  getCartTotal(){
    this.total=0;
    for(let x in this.wishProducts){
      this.total+=this.wishProducts[x].item.price * this.wishProducts[x].quantity
    }
  }
}
