import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPlacedComponent } from './order-placed.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../services/cart/cart.service';
import { of, BehaviorSubject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

// ✅ Mock CartService for TopbarComponent
class MockCartService {
  private cartCount$ = new BehaviorSubject<number>(0);
  getCartCountObservable = jasmine.createSpy().and.returnValue(this.cartCount$.asObservable());
  updateCartCount = jasmine.createSpy();
}

describe('OrderPlacedComponent', () => {
  let component: OrderPlacedComponent;
  let fixture: ComponentFixture<OrderPlacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPlacedComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
