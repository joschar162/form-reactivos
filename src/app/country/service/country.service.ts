import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../../../../../03-country-app/src/app/country/mapper/country.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get getRegions(): string[] {
    return [...this.regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) {
      return of([]);
    }

    console.log({ region });
    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;

    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;

    return this.http.get<Country>(url);
  }

  getCountryBordersByCodes(borders: string[]): Observable<Country[]> {
    if (borders.length === 0) {
      return of([]);
    }

    const codes = borders.join(',');
    const url = `${this.baseUrl}/alpha?codes=${codes}&fields=name,cca3,borders`;

    return this.http.get<Country[]>(url);
  }
}
