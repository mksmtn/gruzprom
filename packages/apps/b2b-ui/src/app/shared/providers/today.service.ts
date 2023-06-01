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
    // sv is for Sweden. It allows for getting timezone-aware
    // date in ISO 8601 format
    map(() => new Date().toLocaleDateString('sv')),
    distinctUntilChanged(),
    shareReplay(1)
  );

  dayChanges(): Observable<string> {
    return this.dateChanges$;
  }
}
