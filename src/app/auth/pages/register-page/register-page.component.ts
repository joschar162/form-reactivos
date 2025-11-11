import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(FormUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        [FormUtils.checkingIfEmailExists],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(FormUtils.notOnlySpacesPattern),
          FormUtils.notStrider,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [FormUtils.isFieldEqualFieldTwo('password', 'password2')],
    }
  );

  // isFieldEqualFieldTwo(field1: string, field2: string) {
  //   return (formGroup: AbstractControl) => {
  //     const value1 = formGroup.get(field1)?.value;
  //     const value2 = formGroup.get(field2)?.value;

  //     return value1 === value2 ? null : { passwordsNotEqual: true };
  //   };
  // }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
