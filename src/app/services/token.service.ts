import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object ) { 
    this.isBrowser = isPlatformBrowser(PLATFORM_ID)
  }

tokenStatus(){
  if (this.isBrowser) {
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
}
