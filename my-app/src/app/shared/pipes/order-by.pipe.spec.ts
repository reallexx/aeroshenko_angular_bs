import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const array = [
    { name: 'John', age: 25, birthDate: new Date('2020-01-01'), vip: false },
    { name: 'Jane', age: 30, birthDate: new Date('2020-01-01'), vip: false },
    { name: 'Bob', age: 35, birthDate: new Date('2021-01-01'), vip: true },
  ];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should sort array in ascending order based on string field', () => {
    const sortedArray = pipe.transform([...array], 'name', 'asc');
    expect(sortedArray[0]).toEqual(array[2]);
    expect(sortedArray[1]).toEqual(array[1]);
    expect(sortedArray[2]).toEqual(array[0]);
  });

  it('should sort array in descending order based on number field', () => {
    const sortedArray = pipe.transform([...array], 'age', 'desc');
    expect(sortedArray[0]).toEqual(array[2]);
    expect(sortedArray[1]).toEqual(array[1]);
    expect(sortedArray[2]).toEqual(array[0]);
  });

  it('should sort array in ascending order based on date field', () => {
    const sortedArray = pipe.transform([...array], 'birthDate', 'asc');
    expect(sortedArray[0]).toEqual(array[0]);
    expect(sortedArray[1]).toEqual(array[1]);
    expect(sortedArray[2]).toEqual(array[2]);
  });

  it('should sort array in descending order based on boolean field', () => {
    const sortedArray = pipe.transform([...array], 'vip', 'desc');
    expect(sortedArray[0]).toEqual(array[2]);
    expect(sortedArray[1]).toEqual(array[0]);
    expect(sortedArray[2]).toEqual(array[1]);
  });

  it('should sort array in descending order based on undefined field', () => {
    const array = [
      { name: 'John', age: 25, birthDate: new Date('2020-01-01'), vip: false },
      { name: 'Jane', age: 30, birthDate: new Date('2020-01-01'), vip: false },
      { name: 'Bob', age: undefined, birthDate: new Date('2021-01-01'), vip: true },
    ];

    const sortedArray = pipe.transform([...array], 'age', 'desc');
    expect(sortedArray[0]).toEqual(array[1]);
    expect(sortedArray[1]).toEqual(array[0]);
    expect(sortedArray[2]).toEqual(array[2]);
  });

  it('should return an empty array if the array is empty', () => {
    const sortedArray = pipe.transform([], 'name', 'asc');
    expect(sortedArray).toEqual([]);
  });
});
