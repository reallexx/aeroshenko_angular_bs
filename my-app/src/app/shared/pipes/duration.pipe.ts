import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const hourForms = ['час', 'часа', 'часов'];
    const minuteForms = ['минута', 'минуты', 'минут'];
    const format = (n: number, forms: string[]) => {
      const idx = n % 100 > 4 && n % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][n % 10 < 5 ? n % 10 : 5];
      return `${n} ${forms[idx]}`;
    };

    const absoluteMinutes = Math.abs(minutes);
    const hours = Math.floor(absoluteMinutes / 60);
    const remainingMinutes = absoluteMinutes % 60;

    if (minutes >= -59 && minutes <= 59) {
      if (minutes < 0) {
        return `-${format(remainingMinutes, minuteForms)}`;
      } else {
        return `${format(minutes, minuteForms)}`;
      }
    } else {
      if (minutes < 0) {
        return `-${format(hours, hourForms)} ${format(remainingMinutes, minuteForms)}`;
      } else {
        return `${format(hours, hourForms)} ${format(remainingMinutes, minuteForms)}`;
      }
    }
  }
}
