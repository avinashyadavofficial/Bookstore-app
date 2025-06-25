import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';
import { BookService } from '../../services/book/book.service';
import { SearchService } from '../../services/search/search.service';

class MockBookService {
  getBooks = jasmine.createSpy().and.returnValue(of({
    result: [
      { bookName: 'Angular Basics', _id: '1', discountPrice: 100, bookImage: '', author: 'Avinash' }
    ]
  }));
}

class MockSearchService {
  private searchQuery = new BehaviorSubject<string>('');
  getSearchQuery() {
    return this.searchQuery.asObservable();
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: BookService, useClass: MockBookService },
        { provide: SearchService, useClass: MockSearchService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
