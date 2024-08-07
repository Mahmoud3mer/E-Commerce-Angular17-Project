import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path: "" , redirectTo: 'home' , pathMatch: 'full'},
    {path: "home" , canActivate: [authGuard] , component: HomeComponent},
    {path: "products" , canActivate: [authGuard] , component: ProductsComponent},
    {path: "about" , canActivate: [authGuard] ,loadComponent: () => import('../app/about/about.component').then(m => m.AboutComponent)},
    {path: "contact" , canActivate: [authGuard] , loadComponent: () => import('../app/contact/contact.component').then(m => m.ContactComponent)},
    {path: "settings" , canActivate: [authGuard] , loadComponent: () => import('../app/settings/settings.component').then(m => m.SettingsComponent)},
    {path: "singlproduct/:productId" , canActivate: [authGuard] , component: ProductDetailsComponent},
    {path: "register" , component: RegisterComponent},
    {path: "login" , component: LoginComponent},

    {path: "**" , component: NotFoundPageComponent}
];
