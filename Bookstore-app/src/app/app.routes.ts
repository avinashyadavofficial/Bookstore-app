import { Routes } from '@angular/router';
import { LoginComponent } from './components/loginSignup/loginSignup.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent }, 
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'forget-password',component:ForgotpasswordComponent},
  {path:'wishlist',component:WishlistComponent},
  {path: 'profile', component: UserProfileComponent },
  {
  path: 'book-details/:bookId',
  component: BookDetailsComponent,
  data: { renderMode: 'disabled' }
},
  {path:'cart',component:CartComponent},
  {path:'order-success',component:OrderPlacedComponent},
  {
  path: 'my-orders',
  component: MyOrdersComponent
}

  
];
