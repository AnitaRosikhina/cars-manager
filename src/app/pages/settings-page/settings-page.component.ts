import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService) {
  }

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
    // move to buildForm function
    this.form = this.fb.group({
      aFirstName: [null, Validators.required],
      aLastName: [null, Validators.required],
      aMiddleName: [null, Validators.required],
      aCars: this.fb.array([
        this.createNewCarFormGroup()
      ])
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
  }

  submit(): void {
    // ToDo add condition for unic car
    let obs: Observable<any>
    if (!this.viewMode && !this.editMode) {
      obs = this.usersService.createOwner(
        this.form.value.lastName,
        this.form.value.firstName,
        this.form.value.middleName,
        this.form.value.cars
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
  }

  addCar(): void {
    this.formArray.push(this.createNewCarFormGroup())
  }

  createNewCarFormGroup(): FormGroup {
    return this.fb.group({
      number: [null, Validators.required],
      manufacturer: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
    })
  }

  removeCar(i: number): void {
    this.formArray.removeAt(i)
  }
}
