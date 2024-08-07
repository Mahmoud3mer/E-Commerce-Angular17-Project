import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
}
