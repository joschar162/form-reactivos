import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 2500)
  );
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static isValidFielInArray(formArray: FormArray, index: number): boolean {
    return (
      formArray.controls[index].invalid && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length == 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static isFieldEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      return value1 === value2 ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingIfEmailExists(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return { emailExists: true };
    }
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim().toLowerCase();

    if (value === 'strider') {
      return { notStrider: true };
    }

    return null;
  }
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`;

        case 'email':
          return `El valor ingresado no es un correo válido.`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern)
            return `El valor ingresado no es un correo válido.`;

          if (errors['pattern'].requiredPattern === FormUtils.namePattern)
            return `El valor ingresado debe ser de formato nombre y apellido.`;

          return `El valor ingresado no cumple con el formato requerido.`;

        case 'emailExists':
          return 'El correo electrónico ya está registrado.';
        case 'notStrider':
          return 'El nombre de usuario no puede ser "strider".';

        default:
          return 'Campo inválido. error desconocido: ' + key;
      }
    }

    return null;
  }
}
