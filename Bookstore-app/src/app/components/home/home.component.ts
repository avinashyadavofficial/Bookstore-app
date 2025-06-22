import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DisplayBookCardComponent } from '../display-book-card/display-book-card.component';
import { MatIconModule } from '@angular/material/icon';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-home',
  imports: [MatCardModule, CommonModule, DisplayBookCardComponent, MatIconModule, TopbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  books:any[]=[];
  constructor(private bookService:BookService){}
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next:(res)=>{
        console.log('res',res);
        this.books=res.result;
      },
      error:(err)=>{
        console.log('Failed to fetch books',err)
      }
    })
  }

}
