import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserPageRoutingModule} from './user-page-routing.module';
import {UsersPageComponent} from "./users-page.component";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [UsersPageComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserPageModule {}
