import { Pipe, PipeTransform } from '@angular/core';

interface Filterable {
  [key: string]: string | number | Date | boolean | undefined;
}

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform<T extends Filterable>(array: T[], field: keyof T, value: string): T[] {
    if (!array || !array.length) {
      return [];
    }

    return array.filter((item) => {
      const fieldValue = item[field];

      if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(value.toLowerCase());
      } else if (typeof fieldValue === 'number') {
        return fieldValue === Number(value);
      } else if (fieldValue instanceof Date) {
        return fieldValue.getTime() === new Date(value).getTime();
      } else if (typeof fieldValue === 'boolean') {
        return String(fieldValue).toLowerCase() === value.toLowerCase();
      } else if (typeof fieldValue === 'undefined') {
        return value.toLowerCase() === 'undefined';
      } else {
        return false;
      }
    });
  }
}
