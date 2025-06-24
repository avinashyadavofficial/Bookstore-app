import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss'],
  standalone: true,
  imports: [TopbarComponent, FooterComponent]
})
export class OrderPlacedComponent implements OnInit {
  orderId: string = '#123456'; 

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedOrder = localStorage.getItem('lastOrderId');
      if (storedOrder) {
        this.orderId = storedOrder;
      }
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
