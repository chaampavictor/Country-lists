import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import{ButtonComponent} from '../button/button.component'

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule,MatCardModule,ButtonComponent]

})
export class CountryCardComponent {
  @Input() country: any; // Input property to receive country data


  constructor( private authService: AuthService) {}
  currentUser: any;
  isAdmin: boolean = false;


  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser.role === 'Admin';
  }
  getCurrencyName(): string {
    const currencyKey = Object.keys(this.country.currencies)[0];
    return this.country?.currencies[currencyKey]?.name;
  }

  getCurrencySymbol(): string {
    const currencyKey = Object.keys(this.country.currencies)[0];
    return this.country?.currencies[currencyKey]?.symbol;
  }
}