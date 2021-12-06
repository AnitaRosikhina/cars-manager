import {FormControl} from "@angular/forms";

export class NumberOfCarValidator {
  static numberOfCar(control: FormControl): {[key: string]: boolean} {
    if(/^([A-Z]{2}\d[0-9]{3}[A-Z]{2})/.test(control.value)) {
      return null
    }
    return {invalidNumber: true}
  }
}
