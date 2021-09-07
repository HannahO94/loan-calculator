import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidCharacters: true, errorMessage: "Only numbers allowed" };
    };
  }

  incomeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = parseInt(control.value) >= 500
      return valid ? null : { toSmall: true, errorMessage: "Minimum 500" };
    };
  }

  amountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = parseInt(control.value) >= 20000
      return valid ? null : { amountToSmall: true, errorMessage: "Minimum 20 000" };
    };
  }

  termValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = parseInt(control.value) >= 3 && parseInt(control.value) <= 30
      return valid ? null : { wrongTerm: true, errorMessage: "Must be between 3 and 30 years" };
    };
  }

}
