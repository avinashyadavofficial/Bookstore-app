import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../../services/cart/cart.service';
import { SearchService } from '../../services/search/search.service';
import { PLATFORM_ID } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

// ✅ Mock CartService
class MockCartService {
  private cartCount$ = new BehaviorSubject<number>(2);
  getCartCountObservable = jasmine.createSpy().and.returnValue(this.cartCount$.asObservable());
  updateCartCount = jasmine.createSpy();
}

// ✅ Mock SearchService
class MockSearchService {
  private searchQuery = new BehaviorSubject<string>('');
  setSearchQuery = jasmine.createSpy();
  getSearchQuery = jasmine.createSpy().and.returnValue(this.searchQuery.asObservable());
}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: SearchService, useClass: MockSearchService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
