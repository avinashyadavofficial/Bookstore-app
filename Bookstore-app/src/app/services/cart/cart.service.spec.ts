import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../http_service/http-service.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpService]            
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
