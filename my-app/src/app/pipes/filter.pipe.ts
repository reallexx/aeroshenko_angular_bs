import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: ICourse[], field: keyof ICourse, value: string): ICourse[] {
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
      } else {
        return false;
      }
    });
  }
}
