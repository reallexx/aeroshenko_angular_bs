import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should transform minutes into a formatted string', () => {
    expect(pipe.transform(1)).toBe('1 минута');
    expect(pipe.transform(120)).toBe('2 часа 0 минут');
    expect(pipe.transform(75)).toBe('1 час 15 минут');
    expect(pipe.transform(-42)).toBe('-42 минуты');
  });
});
