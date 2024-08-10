import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddressComponent } from './user-address/user-address.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  {
    path: 'about',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'user-address', component: UserAddressComponent },
      { path: 'user-wishlist', component: WishlistComponent },
    ],
  },
  {
    path: 'singlproduct/:productId',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'Wishlist', canActivate: [authGuard], component: WishlistComponent },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
