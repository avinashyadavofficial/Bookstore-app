import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PLATFORM_ID } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { of, BehaviorSubject } from 'rxjs';

// ✅ Mock CartService used by TopbarComponent
class MockCartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  getCartCountObservable = jasmine.createSpy().and.returnValue(this.cartCountSubject.asObservable());
  updateCartCount = jasmine.createSpy();
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: PLATFORM_ID, useValue: 'browser' } // 👈 required for isPlatformBrowser
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
