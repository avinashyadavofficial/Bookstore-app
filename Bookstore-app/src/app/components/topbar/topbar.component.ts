import { Component, Input ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatMenuModule,MatButtonModule,MatDividerModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Input() showSearch:boolean=true;
  @Input() showProfile: boolean = true;
  @Input() showCart: boolean = true;
  isLoggedIn:boolean=false;
  userName:string='';
  constructor(private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if(token){
      this.isLoggedIn=true;
      this.userName='User';
    }
    else if (token && user) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(user).fullName;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);
  }
  navigateToProfile(){
    console.log('dfndsj');
    this.router.navigate(['/profile']);
  }
}
