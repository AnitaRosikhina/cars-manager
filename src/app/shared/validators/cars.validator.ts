import {FormArray, FormGroup, ValidatorFn} from "@angular/forms";

export class CarsValidator {

  static hasCars(): ValidatorFn {
    return (formArray: FormArray): { [key: string]: any } | null => {
      let valid: boolean = true
      const error = {noCars: 'Not all cars filled or at least one car'}
      if (!formArray.controls?.length) {
        return error
      }
      formArray.controls.forEach((formGroup: FormGroup) => {
        valid = valid && formGroup.valid
      })
      return valid ? null : error
    }
  }
}
