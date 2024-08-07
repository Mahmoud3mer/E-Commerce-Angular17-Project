
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  errorMesage: string = "";
  isLoading: boolean = false;
  // navigaton pages
  router = inject(Router);


  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9]{3,8}$')]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9]{3,8}$')]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)])
  },{ validators: this.customPasswordMatching.bind(this) });

  constructor(private _authService: AuthService){}

  // Matching password
  public customPasswordMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    
    return password === rePassword ? null : { passwordMismatchError: true };
  }

  register(){
    console.log(this.registerForm);
    
    this.errorMesage = '';
    if (this.registerForm.valid == false) {
      this.registerForm.markAllAsTouched()
    }else{
      this.isLoading = true
      this._authService.register(this.registerForm.value).subscribe({
        next:(res)=>{
          this.registerForm.reset()
          this.router.navigate(['/login'])
        },
        error:(err)=>{
          this.errorMesage = err.error.message;
          this.isLoading = false
        }
      });
      
    }
  } 



}
