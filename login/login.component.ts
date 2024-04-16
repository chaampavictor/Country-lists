// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../components/button/button.component'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    standalone: true,
  imports: [FormsModule,MatIconModule,MatGridListModule,MatCardModule,MatFormFieldModule,ButtonComponent,MatFormFieldModule, MatInputModule, MatIconModule],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      // Handle invalid credentials
      alert('Invalid credentials');
    }
  }
}
