import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';

// 🧪 Updated Mock CartService with missing method
class MockCartService {
  private cartCountSubject = new BehaviorSubject<number>(0);

  getCartItems = jasmine.createSpy().and.returnValue(of({ result: [] }));
  removeCartItem = jasmine.createSpy().and.returnValue(of({}));
  updateQuantity = jasmine.createSpy().and.returnValue(of({}));
  placeOrder = jasmine.createSpy().and.returnValue(of({ result: [{ _id: 'fakeOrderId' }] }));
  updateCartCount = jasmine.createSpy();
  getCartCountObservable = jasmine.createSpy().and.returnValue(this.cartCountSubject.asObservable()); // ✅ added
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
