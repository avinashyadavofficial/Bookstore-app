import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayBookCardComponent } from './display-book-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DisplayBookCardComponent', () => {
  let component: DisplayBookCardComponent;
  let fixture: ComponentFixture<DisplayBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBookCardComponent, RouterTestingModule] // ✅ Added RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayBookCardComponent);
    component = fixture.componentInstance;

    // ✅ Provide a mock @Input() book before running detectChanges
    component.book = {
      _id: 'book123',
      bookName: 'Test Book',
      author: 'Test Author',
      price: 500,
      discountPrice: 350,
      rating: 4,
      bookImage: 'test-image.png'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
