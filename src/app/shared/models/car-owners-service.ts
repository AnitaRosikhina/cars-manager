import {Observable} from "rxjs";
import {IUser} from "./user.model";
import {ICar} from "./car.model";

export interface ICarOwnersService {
  getOwners(): Observable<IUser[]>
  getOwnerById(oId: number): Observable<IUser>
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: ICar[]
  ): Observable<IUser>
  editOwner(aOwner: IUser): Observable<IUser>
  deleteOwner(aOwnerId: number): Observable<IUser[]>
}
