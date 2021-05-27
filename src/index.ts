// Generate random umber from a Beta Distribution http://en.wikipedia.org/wiki/Beta_distribution
// Adapted from https://github.com/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/master/Chapter6_Priorities/d3bandits.js
export function randomBeta(alpha: number, beta: number): number {
  const sum = alpha + beta;
  const ratio = alpha / beta;
  const min = Math.min(alpha, beta);
  let lhs;
  let rhs;
  let y;
  let r1;
  let r2;

  const lambda =
    min <= 1 ? min : Math.sqrt((2 * alpha * beta - alpha - beta) / (sum - 2));

  do {
    r1 = Math.random();
    r2 = Math.random();
    y = Math.pow(1 / r1 - 1, 1 / lambda);
    lhs = 4 * r1 * r2 * r2;
    rhs =
      Math.pow(y, alpha - lambda) *
      Math.pow((1 + ratio) / (1 + ratio * y), sum);
  } while (lhs >= rhs);

  return (ratio * y) / (1 + ratio * y);
}

export function rewardArm(
  arms: Arm[],
  armIndex: number,
  rewardValue: number,
  attemptsCount = 1
): Arm[] {
  return arms.map((arm, index) => {
    if (index === armIndex) {
      const attempts = arm.attempts + attemptsCount;
      const sum = arm.sum + rewardValue;
      return {
        ...arm,
        attempts,
        sum,
      };
    }
    return arm;
  });
}

export function sampleArm(arm: Arm): number {
  return randomBeta(arm.sum, arm.attempts - arm.sum);
}

// sample the probability of choosing each arm, and pick the arm with the largest probability, return its index
export function chooseArm(arms: Arm[]): number {
  return arms
    .map(arm => sampleArm(arm))
    .reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
}
