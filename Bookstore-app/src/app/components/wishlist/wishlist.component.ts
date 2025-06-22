import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  imports: [TopbarComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  constructor(private router:Router){}
  goToLogin(){
    this.router.navigate(['/login']);
  }

}
