import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  appTitle = 'My App';
  isLoggedIn: boolean = false;
  userEmail: string | undefined;
  userRole: string | undefined; // Add this line to store the user role
  currentUser: any;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log("get user",this.currentUser)
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userEmail = undefined;
    this.userRole = undefined; 
       this.router.navigate(['/login']);
    // Your custom logic here
  }
}
