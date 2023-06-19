import { Pipe, PipeTransform } from '@angular/core';

interface Sortable {
  [key: string]: string | number | Date | boolean | undefined;
}

@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  transform<T extends Sortable>(array: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!array || !array.length) {
      return [];
    }
    return array.sort((a, b) => {
      let result = 0;

      const fieldA = a[field];
      const fieldB = b[field];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        result = fieldA.localeCompare(fieldB);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        result = fieldA - fieldB;
      } else if (fieldA instanceof Date && fieldB instanceof Date) {
        result = fieldA.getTime() - fieldB.getTime();
      } else if (typeof fieldA === 'boolean' && typeof fieldB === 'boolean') {
        result = fieldA === fieldB ? 0 : fieldA ? 1 : -1;
      } else if (typeof fieldA === 'undefined' && typeof fieldB === 'undefined') {
        result = 0;
      } else if (typeof fieldA === 'undefined') {
        result = order === 'asc' ? 1 : -1;
      } else if (typeof fieldB === 'undefined') {
        result = order === 'asc' ? -1 : 1;
      }

      if (order === 'desc') {
        result = -result;
      }

      return result;
    });
  }
}
