import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HelperService {
  constructor() {
  }

  public tournaments: Subject<any> = new Subject();
  readonly tournaments$: Observable<any> = this.tournaments.asObservable();

  public delete: Subject<number> = new Subject();
  readonly delete$: Observable<number> = this.delete.asObservable();
}
