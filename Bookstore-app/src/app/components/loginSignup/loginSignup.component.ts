import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  templateUrl: './loginSignup.component.html',
  styleUrls: ['./loginSignup.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  hideLoginPassword = true;
  hideSignupPassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      const currentPath = segments[0]?.path;
      this.isLoginMode = currentPath === 'login';
    });
  }

  toggleMode(val: boolean) {
    this.isLoginMode = val;
    if (val) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  toggleLoginPasswordVisibility() {
    this.hideLoginPassword = !this.hideLoginPassword;
  }

  toggleSignupPasswordVisibility() {
    this.hideSignupPassword = !this.hideSignupPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginPayload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.login(loginPayload).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(res.result);
          localStorage.setItem('authToken', res.result.accessToken);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed');
        }
      });
    } else {
      alert('Please fill all required login fields');
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
          localStorage.setItem('user', JSON.stringify({
              fullName: res.result.fullName,
              email: res.result.email,
              phone: res.result.phone
          }));
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
  goToForgetPassword() {
    this.router.navigate(['/forget-password']); 
  }
}
