import { MapPipe } from './map.pipe';

describe('MapPipe', () => {
  it('create an instance', () => {
    const pipe = new MapPipe();
    expect(pipe).toBeTruthy();
  });

  it('should satisfy the identity rule', () => {
    const pipe = new MapPipe();
    const value = { v: 5 };
    expect(pipe.transform(value, (v) => v)).toBe(value);
  });
});
