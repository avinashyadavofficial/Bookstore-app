import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../http_service/http-service.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // ✅ Provide HttpClient
      providers: [HttpService]             // ✅ Provide HttpService
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
