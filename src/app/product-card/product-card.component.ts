import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { ProductIntrface } from '../product-intrface';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';



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
  @Output() itemm = new EventEmitter;

  addButton:boolean=false;
  addButtonw:boolean=true;
  addButtonred:boolean=true;

  amount:number=0;
  amountt:number=0;
  goToProductDetails(){
    this.router.navigate(['/singlproduct', this.data.id]);
  }
  /* Cart */
  add(){
    this.item.emit({item:this.data,quantity:this.amount})
  }
  addd(){
    this.itemm.emit({item:this.data,quantity:this.amountt+1})
  }
  /* Cart */
}
