import { bernoulli } from '../src';

describe('Bernoulli Random Variable Constructor', () => {
  it('Creates the bernoulli', () => {
    const brv = bernoulli(0.75);

    expect(brv?.mean).toBe(0.75);
    expect(brv?.mode[0]).toBe(1);

    const samples = brv?.generate(300);

    expect(samples?.length).toBe(300);
  });
});
