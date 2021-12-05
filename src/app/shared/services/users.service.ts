import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/user.model";
import {ICarOwnersService} from "../models/car-owners-service";
import {ICar} from "../models/car.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements ICarOwnersService {

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`/api/users`)
  }

  getOwnerById(oId: number): Observable<IUser> {
    return this.http.get<IUser>(`/api/users/${oId}`)
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: ICar[]
  ): Observable<IUser> {
    return this.http.post<IUser>(`/api/users`, {
      aLastName,
      aFirstName,
      aMiddleName,
      aCars
    })
  }

  editOwner(aOwner: IUser): Observable<IUser> {
    return this.http.put<IUser>(`/api/users/${aOwner.id}`, aOwner)
  }

  deleteOwner(aOwnerId: number): Observable<IUser[]> {
    return this.http.delete<IUser[]>(`/api/users/${aOwnerId}`)
  }
}
