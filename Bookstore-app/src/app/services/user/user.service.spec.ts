import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../http_service/http-service.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpService]             
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
