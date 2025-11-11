import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

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
  border = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChange();

    onCleanUp(() => {
      regionSubscription.unsubscribe();
      console.log('Limpiado');
    });
  });

  onRegionChange() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.border.set([]);
          this.countryByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        console.log({ countries });
        this.countryByRegion.set(countries);
      });
  }
}
