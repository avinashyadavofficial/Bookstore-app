import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBookCardComponent } from './display-book-card.component';

describe('DisplayBookCardComponent', () => {
  let component: DisplayBookCardComponent;
  let fixture: ComponentFixture<DisplayBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
