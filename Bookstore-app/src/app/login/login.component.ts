import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { response } from 'express';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginMode = true;
  loginForm:FormGroup;
  signupForm: FormGroup;
  hideLoginPassword = true;
  hideSignupPassword = true;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
  ){
    this.loginForm=this.fb.group({
      email:['',
        [Validators.required,Validators.email],
      ],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
  });
  }

  toggleMode(val:boolean){
    this.isLoginMode=val;
  }
  toggleLoginPasswordVisibility() {
    this.hideLoginPassword = !this.hideLoginPassword;
  }
  toggleSignupPasswordVisibility() {
    this.hideSignupPassword = !this.hideSignupPassword;
  }
  onLogin(){
    if(this.loginForm.valid){
      const loginPayload={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      };

      this.userService.login(loginPayload).subscribe({
        next:(res:any)=>{
          console.log(res);
          localStorage.setItem('authToken',res.result.accessToken);
        }
      })
    }
  }
  onSignup() {
    if (this.signupForm.valid) {
      const signupPayload = {
        fullName: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phone: this.signupForm.value.mobileNumber,
      };

      this.userService.register(signupPayload).subscribe({
        next: (res: any) => {
          console.log('Signup Success:', res);
          alert('Registration successful');
          this.toggleMode(true);
        },
        error: (err) => {
          console.error('Signup Failed:', err);
          alert('Registration failed');
        }
      });
    } else {
      alert('Please fill all required signup fields');
    }
  }


}
