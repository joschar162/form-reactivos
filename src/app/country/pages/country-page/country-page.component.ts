import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);

  countryService = inject(CountryService);
  regions = signal(this.countryService.getRegions);
  countryByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    borders: ['', [Validators.required]],
  });
}
