import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const hourforms = ['час', 'часа', 'часов'];
    const minuteforms = ['минута', 'минуты', 'минут'];
    const format = (n: number, forms: string[]) => {
      const idx = n % 100 > 4 && n % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][n % 10 < 5 ? n % 10 : 5];
      return `${n} ${forms[idx]}`;
    };

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${format(hours, hourforms)} ${format(remainingMinutes, minuteforms)}`;
    } else {
      return `${format(minutes, minuteforms)}`;
    }
  }
}
