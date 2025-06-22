import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-book-details',
  imports: [TopbarComponent, FooterComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  book:any;
  constructor(){
    this.book=history.state.book;
  }

}
