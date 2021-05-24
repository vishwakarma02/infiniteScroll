import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    let counter, str = '';
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29){
        // less than 30 seconds ago will show as 'Just now'
        str = 'Just now';
      }
      const intervals = [
        {
          name: 'year',
          seconds: 31536000
        },
        {
          name: 'month',
          seconds: 2592000
        },
        {
          name: 'week',
          seconds: 604800
        },
        {
          name: 'day',
          seconds: 86400
        },
        {
          name: 'hour',
          seconds: 3600
        },
        {
          name: 'minute',
          seconds: 60
        },
        {
          name: 'second',
          seconds: 1
        }
      ];
      intervals.forEach((interval): string | void => {
        counter = Math.floor(seconds / interval.seconds);
        if (counter > 0 && !str) {
          if (counter === 1) {
            str =  `${counter} ${interval.name} ago`; // singular (1 day ago)
          } else {
            str =  `${counter} ${interval.name}'s ago`; // plural (2 days ago)
          }
        }
      });
    }
    return str;
  }
}
