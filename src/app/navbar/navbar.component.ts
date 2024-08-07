import { Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  logoImgUrl: string = '../../assets/Images/images.jpeg';

  isLoggedIn: boolean = false;
  isBrowser: boolean = false;
  constructor(private _authService: AuthService , @Inject(PLATFORM_ID) platformId: Object ){
    this.isBrowser = isPlatformBrowser(platformId);

    _authService.LoggedInUser.subscribe(res => {
      console.log(res, "from nav bar")
      if (res) {
        this.isLoggedIn = res? true: false;
        console.log(this.isLoggedIn, "from nav bar")
      }else if(this.isBrowser){
        if (localStorage.getItem('token')) {
          this.isLoggedIn = true;
        }
      }
      else{
        this.isLoggedIn = false;
        console.log(this.isLoggedIn)
      }
      console.log(this.isLoggedIn)
    })
  }

  logOut(){
    this._authService.logOut()
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
  }

}
