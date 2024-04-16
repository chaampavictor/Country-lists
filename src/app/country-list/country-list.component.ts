import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpErrorResponse } from '@angular/common/http';
import { CountryCardComponent } from '../components/country-card/country-card.component'; 
import { ButtonComponent } from '../components/button/button.component'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../components/navbar/navbar.component'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface User {
  email: string;
  role: string;
}

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,CountryCardComponent,MatGridListModule,MatButtonModule,ButtonComponent,NavbarComponent]
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  searchTerm: string = '';
  noCountryFound: boolean = false;
  isLoading: boolean = false; // Added isLoading variable

  currentUser: User | null | undefined;
  breakpointObserver: any;

  cols = 1;

  constructor(private countryService: CountryService, breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {}

 

  ngOnInit(): void {
    this.fetchCountries();
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      console.log("get no user")
    }
  }

  handleButtonClick() {
    alert('Button Clicked!');
    // Your custom logic here
  }

  fetchCountries() {
    this.isLoading = true; // Set isLoading to true when fetching starts
    this.countryService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.countries.forEach(country => {
        const isoCode = country.cca2.toLowerCase(); // Convert ISO code to lowercase
        country.flag = this.countryService.getCountryFlag(isoCode);
      });
      this.isLoading = false; // Set isLoading back to false when fetching completes
    });
  }

  getCurrencyName(country: any): string {
    const currencyKey = Object.keys(country.currencies)[0];
    return country?.currencies[currencyKey]?.name;
  }

  getCurrencySymbol(country: any): string {
    const currencyKey = Object.keys(country.currencies)[0];
    return country?.currencies[currencyKey]?.symbol;
  }

  searchCountries() {
    if (this.searchTerm.trim() === '') {
      this.fetchCountries();
      return;
    }

    this.isLoading = true; // Set isLoading to true when searching starts
    this.countryService.searchCountriesByName(this.searchTerm)
      .subscribe(data => {
        if (data.length === 0) {
          this.noCountryFound = true;
          console.log("empty countries")
        } else {
          this.countries = data;
          this.countries.forEach(country => {
            const isoCode = country.cca2.toLowerCase(); // Convert ISO code to lowercase
            country.flag = this.countryService.getCountryFlag(isoCode);
          });
          this.noCountryFound = false;
          this.isLoading = false;

        }
        this.isLoading = false; // Set isLoading back to false when searching completes
      },(error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.noCountryFound = true;
          this.isLoading = false;
          this.countries = []; // Clear existing countries
        } else {
          console.error('Error occurred while searching:', error);
        }
      });
  }

  resetSearch() {
    this.searchTerm = ''; // Reset the search term
    this.fetchCountries(); // Fetch all countries
    this.noCountryFound = false; // Reset the noCountryFound flag
  }
}
