import { Component, DoCheck, OnInit } from '@angular/core';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { BrandSliderComponent } from './brand-slider/brand-slider.component';
import { BannerComponent } from './banner/banner.component';
import { ProductIntrface } from '../product-intrface';
import { ProductsService } from '../products.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorySliderComponent,
    BrandSliderComponent,
    BannerComponent,
    ProductCardComponent,
    LoaderComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements DoCheck{
  products: ProductIntrface[] = [];

  sortedProducts: ProductIntrface[] = [];

  inputNameProdut: string = '';

  cartProducts:any[]=[]

  minPrice: number = 0;
  maxPrice: number = 1000;
  rangeValue: number = 0

  constructor(private _productsService: ProductsService){
    _productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.sortedProducts = [...this.products]
      },
      error:(err) =>{
        console.log(err);
      },
      complete:() => {
        console.log("Completed");

      }
    })
  }

  // 1- filtration by dropdown
  filterBySelection(option: string){
    if (option == 'All') {
      this.sortedProducts = [...this.products];
    }
    else if(option == 'priceAsc'){
      this.sortedProducts = this.products.sort((a,b) => a.price - b.price);
    }
    else if(option == 'priceDesc'){
      this.sortedProducts = this.products.sort((a,b) => b.price - a.price);
    }
    else if(option == 'nameAsc'){
      this.sortedProducts = this.products.sort((a,b) => a.title.localeCompare(b.title));
    }
    else if(option == 'nameDesc'){
      this.sortedProducts = this.products.sort((a,b) => b.title.localeCompare(a.title));
    }
  }

  filtrationBySelection(event: any){
    const option = event.target.value;
    this.filterBySelection(option);
  }

  // 2- filtration by name
  filterByName(name: string): void {
    this.sortedProducts = this.sortedProducts.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
  }

  filtrationByName(event: any) : void{
    const name = event.target.value;
    if (name == '') {
      this.sortedProducts = [... this.products]
    }else{
      this.filterByName(name);
    }

    console.log(this.sortedProducts)
  }

  // 2- filtration by range price
  filterByPrice(value: number){
    this.sortedProducts = this.sortedProducts.filter(product => product.price <= value);
  }

  filtrationByPrice(event: any) : void{
    let value = event.target.value;
    console.log(event.target.value)
    this.filterByPrice(value)
  }


  currentPage: number = 1;
  itemsPerPage: number = 10;
  numberPages: number = 0
  arrayNumberPages: number[] = []

  ngDoCheck(): void {
    this.showPagenubers()
  }

  showPagenubers(){
    this.numberPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.arrayNumberPages = Array(this.numberPages).fill(0).map((x,index) => index + 1);
    console.log(this.arrayNumberPages,this.numberPages,this.products.length)
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
