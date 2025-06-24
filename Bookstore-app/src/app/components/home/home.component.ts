import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DisplayBookCardComponent } from '../display-book-card/display-book-card.component';
import { MatIconModule } from '@angular/material/icon';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SearchService } from '../../services/search/search.service';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, DisplayBookCardComponent, MatIconModule, TopbarComponent, FooterComponent, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  books:any[]=[];
  filteredBooks: any[] = [];
  currentPage = 0;
pageSize = 10;
pagedBooks: any[] = [];
  constructor(private bookService:BookService,
    private searchService:SearchService
  ){}
  
ngOnInit(): void {
  this.bookService.getBooks().subscribe({
    next: (res) => {
      this.books = res.result;
      this.filteredBooks = [...this.books];
      this.updatePagedBooks();

      this.searchService.getSearchQuery().subscribe(query => {
        this.filteredBooks = this.books.filter(book =>
          book.bookName.toLowerCase().includes(query)
        );
        this.currentPage = 0;
        this.updatePagedBooks();
      });
    },
    error: (err) => {
      console.log('Failed to fetch books', err);
    }
  });
}
updatePagedBooks() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedBooks = this.filteredBooks.slice(startIndex, endIndex);
}
onPageChange(event: any) {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.updatePagedBooks();
}



}
