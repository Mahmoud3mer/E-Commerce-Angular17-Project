import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  _httpClient = inject(HttpClient);
  LoggedInUser: BehaviorSubject<string> = new BehaviorSubject('');
  private isBrowser: boolean;
  router = inject(Router);

  constructor( @Inject(PLATFORM_ID) platformId: Object) { 

    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      console.log(this.isBrowser ,'this.isBrowserthis.isBrowserthis.isBrowser')
      console.log(localStorage.getItem('token'))
    }
  }

  register(data:any): Observable<any>{
    return this._httpClient.post('http://localhost:4000/api/users/register',data)
  }

  logIn(data:any): Observable<any>{
    return this._httpClient.post('http://localhost:4000/api/users/login',data)
  }


  saveUserData(token: string){
    if (this.isBrowser) {
      localStorage.setItem("token" , token);
    }
    this.LoggedInUser.next(token)
  } 

logOut(){
  if (this.isBrowser) {
    localStorage.removeItem('token');
    this.LoggedInUser.next('')
    this.router.navigate(['/login']);
  }
  
}
}


