import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsPageRoutingModule} from './settings-page-routing.module';
import {SettingsPageComponent} from "./settings-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule,
    SettingsPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class SettingsPageModule {}
