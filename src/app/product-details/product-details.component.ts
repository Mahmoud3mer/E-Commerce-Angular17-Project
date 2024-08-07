import { Component, OnInit } from '@angular/core';
import { ProductIntrface } from '../product-intrface';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css' 
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: ProductIntrface;

  constructor(private myRoute: ActivatedRoute ,private _productsService: ProductsService){}


  ngOnInit(): void {
    this.myRoute.paramMap.subscribe(params => {  //observable
      this.productId = +params.get('productId')!; // params is object
      this.getProductDetails(this.productId);
    });
  }


  getProductDetails(id: number) {
    this._productsService.getProducts().subscribe({
      next: (res: ProductIntrface[]) => {
        this.product = res.find(product => product.id === id)!;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      }
    });
}
}
