import {Lookups} from '../models/grid';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  getDescription(
    lookups: Lookups,
    lookupName: string,
    id: string
  ): string {

    return lookups[lookupName]?.options.find(
      option => option.id === id
    )?.description ?? id;
  }
}
