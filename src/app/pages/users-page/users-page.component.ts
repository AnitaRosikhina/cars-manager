import {Component, OnInit} from '@angular/core';
import {IUser} from "../../shared/models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})


export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'middleName', 'sum', 'editButton', 'deleteButton'];
  dataSource = new MatTableDataSource<IUser>()
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.usersService.getOwners().subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
    })
  }

  navigateToView({id}: IUser): void {
    this.router.navigate(['settings', id, 'view'])
  }

  deleteUser($event: MouseEvent, id: number): void {
    $event.preventDefault()
    $event.stopImmediatePropagation()
    this.usersService.deleteOwner(id).subscribe(() => {
      this.getAllUsers()
    })
  }

  editUser($event: MouseEvent, id: number): void {
    $event.preventDefault()
    $event.stopImmediatePropagation()
    this.router.navigate(['settings', id])
  }
}
