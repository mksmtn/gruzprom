import { Injectable } from '@angular/core';
import {
  Observable,
  distinctUntilChanged,
  interval,
  map,
  shareReplay,
  startWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodayService {
  private readonly dateChanges$ = interval(1000 * 60).pipe(
    startWith(-1),
    map(() => new Date().toISOString().slice(0, 10)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  dayChanges(): Observable<string> {
    return this.dateChanges$;
  }
}
