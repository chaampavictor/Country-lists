// country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';
  private countryDetailsUrl = 'https://restcountries.com/v3.1/alpha/';
  
  constructor(private http: HttpClient) { }
  
  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=name,capital,currencies,region,population,cca2`);
  }
  
  getCountryFlag(isoCode: string): string {
    return `https://flagcdn.com/${isoCode}.svg`;
  }

  getCountryDetails(code: string) {
    return this.http.get(this.countryDetailsUrl + code);
  }

  searchCountriesByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}?fullText=true`);
  }
}
