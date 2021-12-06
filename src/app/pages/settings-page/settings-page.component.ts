import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {NumberOfCarValidator} from "../../shared/validators/numberOfCar.validator";
import {CarsValidator} from "../../shared/validators/cars.validator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  form: FormGroup;
  allUsers = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private _snackBar: MatSnackBar) {}

  get formArray(): FormArray {
    return this.form.controls['aCars'] as FormArray;
  }

  get viewMode(): boolean {
    return this.router.url.includes('view')
  }

  get editMode(): boolean {
    return !this.router.url.includes('new') && !this.router.url.includes('view')
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      aFirstName: [null, Validators.required],
      aLastName: [null, Validators.required],
      aMiddleName: [null, Validators.required],
      aCars: this.fb.array([
        this.createNewCarFormGroup()
      ], CarsValidator.hasCars())
    })

    if (this.viewMode || this.editMode) {
      this.usersService.getOwnerById(this.activatedRoute.snapshot.params['id']).subscribe(res => {
        if (res.aCars.length > 1) {
          this.formArray.removeAt(0)
          res.aCars.forEach(() => {
            this.formArray.push(this.createNewCarFormGroup())
          })
        }
        this.form.patchValue(res)

        if (this.viewMode) {
          this.form.disable()
        }
      })
    }
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.usersService.getOwners().subscribe(res => {
      this.allUsers = res
    })
  }

  submit(): void {
    if (!this.allUsers
      .some(user => user.aCars
        .some(car => this.form.value.aCars
          .some(formCar => formCar.number === car.number)))
    ) {
      let obs: Observable<any>
      if (!this.viewMode && !this.editMode) {
        obs = this.usersService.createOwner(
          this.form.value.aLastName,
          this.form.value.aFirstName,
          this.form.value.aMiddleName,
          this.form.value.aCars
        )
      } else if (this.editMode) {
        obs = this.usersService.editOwner({
          ...this.form.value,
          id: +this.activatedRoute.snapshot.params['id']
        })
      }
      obs.subscribe(() => {
        this.router.navigate(['/'])
      })
    } else {
      this.openSnackBar('Номер уже занят!')
    }
  }

  addCar(): void {
    this.formArray.push(this.createNewCarFormGroup())
  }

  createNewCarFormGroup(): FormGroup {
    return this.fb.group({
      number: [null, [Validators.required, NumberOfCarValidator.numberOfCar]],
      manufacturer: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
    })
  }

  removeCar(i: number): void {
    this.formArray.removeAt(i)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {duration: 5000});
  }
}
