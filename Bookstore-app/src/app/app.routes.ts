import { Routes } from '@angular/router';
import { LoginComponent } from './components/loginSignup/loginSignup.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent }, 
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'forget-password',component:ForgotpasswordComponent},
  {path:'wishlist',component:WishlistComponent},
  {path: 'profile', component: UserProfileComponent },
  { path: 'book-details', component: BookDetailsComponent }
];
