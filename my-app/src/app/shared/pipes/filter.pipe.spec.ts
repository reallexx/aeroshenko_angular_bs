import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should filter array based on field and value', () => {
    const array = [
      { name: 'John', age: 25, birthDate: new Date('2020-01-01'), vip: false },
      { name: 'Jane', age: 30, birthDate: new Date('2020-01-01'), vip: false },
      { name: 'Bob', age: 35, birthDate: new Date('2021-01-01'), vip: true },
    ];

    const filteredArray = pipe.transform(array, 'name', 'John');
    expect(filteredArray.length).toBe(1);
    expect(filteredArray[0]).toEqual(array[0]);

    const filteredArray2 = pipe.transform(array, 'age', '30');
    expect(filteredArray2.length).toBe(1);
    expect(filteredArray2[0]).toEqual(array[1]);

    const filteredArray3 = pipe.transform(array, 'name', 'test');
    expect(filteredArray3.length).toBe(0);

    const filteredArray4 = pipe.transform(array, 'birthDate', new Date('2020-01-01').toString());
    expect(filteredArray4.length).toBe(2);

    const filteredArray5 = pipe.transform(array, 'vip', 'true');
    expect(filteredArray5.length).toBe(1);
    expect(filteredArray5[0]).toEqual(array[2]);
  });

  it('should return an empty array if the array is empty', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const array: any[] = [];
    const field = '';
    const value = '';

    const result = pipe.transform(array, field, value);

    expect(result).toEqual([]);
  });

  it('should filter if the field value is undefined', () => {
    const array = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 3, name: 'Jake', age: undefined },
    ];
    const field = 'age';
    const value = 'undefined';

    const result = pipe.transform(array, field, value);

    expect(result.length).toBe(1);
  });
});
