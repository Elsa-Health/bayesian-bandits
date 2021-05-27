import { randomBeta, rewardArm, sampleArm, chooseArm } from '../src';

describe('Bayesian Bandits', () => {
  const candies = {
    arms: [
      {
        attempts: 20,
        sum: 10,
        name: 'Twix',
      },
      {
        attempts: 20,
        sum: 18,
        name: 'Recees',
      },
      {
        attempts: 20,
        sum: 14,
        name: 'Top Deck',
      },
      {
        attempts: 20,
        sum: 1,
        name: 'Mounds',
      },
    ],
  };

  function mean(list: Array<number>) {
    return list.reduce((a, b) => a + b, 0) / list.length;
  }

  function getStandardDeviation(list: Array<number>) {
    const count = list.length;
    const mean = list.reduce((a, b) => a + b) / count;
    return Math.sqrt(
      list.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / count
    );
  }

  it('samples random beta distributions appropriately', () => {
    const samplePs = Array(300)
      .fill(() => randomBeta(1000, 100))
      .map(x => x());

    const meanPs = mean(samplePs);
    expect(meanPs).toBeGreaterThanOrEqual(0.87);
    expect(meanPs).toBeLessThanOrEqual(0.97);
  });

  it('chooses the arms with the highest likelihood of providing a good return', () => {
    const sampleArms = Array(300)
      .fill(() => chooseArm(candies.arms))
      .map(x => x());

    const armSampleCounts = sampleArms.reduce(
      function(obj, num) {
        obj[num] += 1;
        return obj;
      },
      {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      }
    );

    const armSampleEntries = Object.keys(armSampleCounts)
      .map(k => [+k, armSampleCounts[k]])
      .sort((a, b) => b[1] - a[1]);

    expect(armSampleEntries[0][0]).toBe(1);
    expect(armSampleEntries[1][0]).toBe(2);
  });

  it('Rewards arms as expected', () => {
    const updatedCandyArms = rewardArm(candies.arms, 0, 1.3);

    expect(updatedCandyArms[0]).toMatchObject({
      attempts: 21,
      sum: 11.3,
      name: 'Twix',
    });
  });

  it('Samples from a given arm', () => {
    candies.arms.map(arm => {
      const samples = Array(500)
        .fill(() => sampleArm(arm))
        .map(x => x());

      const expectedMean = arm.sum / arm.attempts;
      const meanSamples = mean(samples);
      const oneSD = getStandardDeviation(samples);

      expect(meanSamples + oneSD).toBeGreaterThanOrEqual(expectedMean);
      expect(meanSamples - oneSD).toBeLessThanOrEqual(expectedMean);
    });
  });
});

console.log(sampleArm);
