import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock services
class MockBookService {
  getBooks() {
    return of({ result: [{ _id: '123', title: 'Test Book' }] });
  }
}

class MockCartService {
  addToCart = jasmine.createSpy().and.returnValue(of({ result: { _id: 'cart123' } }));
  updateQuantity = jasmine.createSpy().and.returnValue(of({}));
  updateCartCount = jasmine.createSpy();
}

class MockWishlistService {
  addWishlist = jasmine.createSpy().and.returnValue(of({}));
}

class MockHttpService {
  getApi = jasmine.createSpy().and.returnValue(of({ result: [] }));
  postApi = jasmine.createSpy().and.returnValue(of({}));
}

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
        { provide: 'BookService', useClass: MockBookService },
        { provide: 'CartService', useClass: MockCartService },
        { provide: 'WishlistService', useClass: MockWishlistService },
        { provide: 'HttpService', useClass: MockHttpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
