import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errorMesage: string = "";
  isLoading: boolean = false;
  // navigaton pages
  router = inject(Router);

  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required ,Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,8}$'))]),
  })

  constructor(private _authService: AuthService){}

  logIn(){
    this.errorMesage = '';
    if (this.logInForm.valid == false) {
      this.logInForm.markAllAsTouched()
    }else{
      this.isLoading = true
      this._authService.logIn(this.logInForm.value).subscribe({
        next:(res)=>{
          this.logInForm.reset()
          this._authService.saveUserData(JSON.stringify(res.data['Token']))
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          this.errorMesage = err.error.message;
          this.isLoading = false
        }
      });
      
    }
  }
}
