## Bayesian Bandits

References:

- https://web.stanford.edu/~bvr/pubs/TS_Tutorial.pdf
- https://towardsdatascience.com/thompson-sampling-fc28817eacb8

#### Quick Start:

In the root of your folder run `yarn add bayesian-bandits` to install the package.

Inside your JS/TS files:

```js
// Example to help Megan choose what chocolate to buy for maximum enjoyment
// without making it completely impossible for tastes to change
import { chooseArm, rewardArm, bernoulli } from 'bayesian-bandits';

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

// To choose the arm you want to pull
const armIndex = chooseArm(banditState.arms);

// Deremine the reward for the arm based on your application logic
const armReward = 1;

// Number of total attemts that resulted in the above reward
const armReward = 1;

const updatedBanditArms = rewardArm(
  candies.arms,
  armIndex,
  armReward,
  attempts
);

// Store the updated Bandit Arms in state ready for reuse later on.
storeSomethingMethod(updatedBandits);
```

### License

MIT
