const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();

ig.state.generateDevice("droidcv1");
ig.simulate.preLoginFlow();

(async () => {
  try {
    await ig.account.login("droidcv1", ";ya_#GkM,KND6?$");
  } catch (e) {
    if (e.name === 'IgCheckpointError') {
      console.log('Checkpoint error:', e);
      await ig.challenge.auto(true); // Requesting SMS or email verification
    } else {
      console.error('Other error:', e);
    }
  }
})();
