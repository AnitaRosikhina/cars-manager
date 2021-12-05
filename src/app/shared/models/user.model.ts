import {ICar} from "./car.model";

export interface IUser {
  id: number
  aFirstName: string
  aLastName: string
  aMiddleName: string
  aCars: ICar[]
}
