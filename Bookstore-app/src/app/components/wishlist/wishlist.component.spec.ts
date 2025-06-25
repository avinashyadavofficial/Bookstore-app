import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistComponent } from './wishlist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { HttpService } from '../../services/http_service/http-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WishlistComponent,
        HttpClientTestingModule,     // ✅ Fix for HttpClient
        RouterTestingModule          // ✅ Fix for Router
      ],
      providers: [
        WishlistService,
        HttpService                  // ✅ Add both required services
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
