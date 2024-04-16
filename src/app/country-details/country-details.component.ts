import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient } from '@angular/common/http'; 
import { ButtonComponent } from '../components/button/button.component'; 
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  imports: [CommonModule, RouterModule,MatGridListModule,MatIconModule,ButtonComponent,MatProgressSpinnerModule],
  standalone: true,
})
export class CountryDetailsComponent implements OnInit {
  country: any;
  isLoading: boolean = true;
  borderingCountries: string[] = [];
Object: any;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const countryCode = this.route.snapshot.paramMap.get('code');
    if (countryCode !== null) {
      this.loadCountryDetails(countryCode);
    }
  }
  goBack(): void {
    // Navigate back to the home page
    this.router.navigate(['/']);
  }
  loadCountryDetails(countryCode: string): void {
    this.isLoading = true; 
    this.countryService.getCountryDetails(countryCode).subscribe((data: any) => {
      this.country = data[0];
      console.log("get the details", data[0]);
      this.isLoading = false;

      this.loadBorderingCountries(this.country?.borders);
    });
  }

  loadBorderingCountries(borders: string[]): void {
    borders?.forEach((borderCode: string) => {
      this.http.get<any>(`https://restcountries.com/v3.1/alpha/${borderCode}`)
        .subscribe((data: any) => {
          console.log("get border",data[0].name.common)
          this.borderingCountries.push(data[0]?.name?.common);
          // console.log("Bordering Countries:", this.borderingCountries);
        });
    });
  }

  getCurrencyName(country: any): string {
    if (country?.currencies) {
      const currencyKeys = Object.keys(country.currencies);
      if (currencyKeys.length > 0) {
        const currencyKey = currencyKeys[0];
        return country.currencies[currencyKey].name;
      }
    }
    return '';
  }
  
  getCurrencySymbol(country: any): string {
    if (country?.currencies) {
      const currencyKeys = Object.keys(country.currencies);
      if (currencyKeys.length > 0) {
        const currencyKey = currencyKeys[0];
        return country.currencies[currencyKey].symbol;
      }
    }
    return '';
  }

  
}
