interface Arm {
  attempts: number; // number of attempts
  sum: number; // amount of reward
  name?: string; // optional name of the Arm
}

interface Bandit {
  arms: Arm[];
}

type Bernoulli = {
  '0': { pmf: number; cdf: number };
  '1': { pmf: number; cdf: number };
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  skewness: number;
  entropy: number;
  domain: { min: number; max: number };
  range: { min: number; max: number };
  generate: (n: number) => number[];
};
