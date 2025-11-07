import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-pages',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-pages.component.html',
})
export class SwitchesPagesComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
