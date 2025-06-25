import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
@Component({
  selector: 'app-forgotpassword',
  imports: [
    TopbarComponent,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  forgotForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }


}
