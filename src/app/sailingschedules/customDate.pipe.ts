import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysFromNow',
  pure: true,
})
export class DaysFromNow implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date(value) - +new Date()) / 1000);
      if (seconds < 29) return 'Arriving Shortly';
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' from now';
          } else {
            return counter + ' ' + i + 's from now';
          }
      }
    }
    return value;
  }
}
