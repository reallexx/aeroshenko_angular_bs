import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: ICourse[], field: keyof ICourse, order: 'asc' | 'desc' = 'asc'): ICourse[] {
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
      }
      if (order === 'desc') result = -result;

      return result;
    });
  }
}
