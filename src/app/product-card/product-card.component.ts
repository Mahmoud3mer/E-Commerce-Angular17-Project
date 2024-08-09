import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductIntrface } from '../product-intrface';
import { Router } from '@angular/router';
import { EventEmitterAsyncResource } from 'events';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  // // @Input() data: Product = {} as Product;
  // @Input() data!: any;
  router = inject(Router)

  @Input() data!: ProductIntrface;

  /* Cart */
/*   @Input() inp : any={}; */
  @Output() item = new EventEmitter;
  addButton:boolean=false;
  amount:number=0;

  goToProductDetails(){
    this.router.navigate(['/singlproduct', this.data.id]);
  }
  add(){
    this.item.emit({item:this.data,quantity:this.amount})
  }
}
