import { Component, inject, Input, Output } from '@angular/core';
import { ProductIntrface } from '../product-intrface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  // // @Input() data: Product = {} as Product;
  // @Input() data!: any;
  router = inject(Router)

  @Input() data!: ProductIntrface;

  goToProductDetails(){
    this.router.navigate(['/singlproduct', this.data.id]);
  }
}
