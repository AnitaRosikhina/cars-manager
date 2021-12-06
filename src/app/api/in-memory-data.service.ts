import {InMemoryDbService} from 'angular-in-memory-web-api';
import {IUser} from "../shared/models/user.model";

export class InMemoryDataService implements InMemoryDbService {
  createDb(): { users: IUser[] } {
    return {
      users: [
        {
          id: 1,
          aFirstName: 'Иван',
          aLastName: 'Иванов',
          aMiddleName: 'Иванович',
          aCars: [
            {
              number: 'BC2018HM',
              manufacturer: 'BMW',
              model: 'X5',
              year: '2018',
            },
            {
              number: 'BC2021HM',
              manufacturer: 'BMW',
              model: 'X7',
              year: '2021',
            },
          ]
        },
        {
          id: 2,
          aFirstName: 'Петр',
          aLastName: 'Петров',
          aMiddleName: 'Петрович',
          aCars: [
            {
              number: 'BC2012HM',
              manufacturer: 'Mazda',
              model: 'one',
              year: '2012',
            }
          ]
        },
        {
          id: 3,
          aFirstName: 'Олег',
          aLastName: 'Олегов',
          aMiddleName: 'Олегович',
          aCars: [
            {
              number: 'BC1111HM',
              manufacturer: 'Tesla',
              model: 'zero',
              year: '2018',
            },
            {
              number: 'BC0000HM',
              manufacturer: 'Tesla',
              model: 'super',
              year: '2021',
            }
          ]
        },
      ]
    }
  }
}
