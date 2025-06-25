import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyOrdersComponent } from './my-orders.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../services/cart/cart.service';
import { of, BehaviorSubject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

// ✅ Mock CartService for order retrieval
class MockCartService {
  private cartCount$ = new BehaviorSubject<number>(0);
  getCartItems = jasmine.createSpy().and.returnValue(of({ result: [] }));
  getCartCountObservable = jasmine.createSpy().and.returnValue(this.cartCount$.asObservable());
  updateCartCount = jasmine.createSpy();
}

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
