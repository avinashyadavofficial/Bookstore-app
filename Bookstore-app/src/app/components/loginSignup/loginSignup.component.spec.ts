import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './loginSignup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user/user.service';
import { HttpService } from '../../services/http_service/http-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, HttpService] 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
