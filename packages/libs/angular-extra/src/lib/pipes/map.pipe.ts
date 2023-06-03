import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true,
  pure: true,
})
export class MapPipe implements PipeTransform {
  transform<T = unknown, R = unknown>(value: T, f: (v: T) => R): R {
    return f(value);
  }
}
