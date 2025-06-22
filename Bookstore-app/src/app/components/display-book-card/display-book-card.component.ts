import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatIconModule],
  templateUrl: './display-book-card.component.html',
  styleUrls: ['./display-book-card.component.scss']
})
export class DisplayBookCardComponent {
  constructor(private router:Router){}
  @Input() book: any;
  openBookDetails(book:any){
    this.router.navigate(['/book-details'],{state:{book}});
  }
}
