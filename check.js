const { IgApiClient } = require('instagram-private-api');
const { writeFile, readFile } = require('fs/promises');
const ig = new IgApiClient();

ig.state.generateDevice("droidcv1");

async function login() {
  try {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login("droidcv1", ";ya_#GkM,KND6?$");
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    await saveCookies();
    console.log('Login successful');
  } catch (e) {
    if (e.name === 'IgCheckpointError') {
      console.log('Checkpoint error:', e);
      await ig.challenge.auto(true); // Requesting SMS or email verification
      console.log('Please verify the challenge on your device and restart the script.');
    } else {
      console.error('Other error:', e);
    }
  }
}

async function saveCookies() {
  const cookies = await ig.state.serializeCookieJar();
  await writeFile('cookies.json', JSON.stringify(cookies));
}

async function loadCookies() {
  const cookies = await readFile('cookies.json', 'utf-8');
  await ig.state.deserializeCookieJar(JSON.parse(cookies));
}

(async () => {
  try {
    await loadCookies();
    await ig.account.currentUser(); // Verify if cookies are still valid
    console.log('Cookies loaded, login not required');
  } catch (e) {
    console.log('Cookies invalid or not found, logging in');
    await login();
  }
})();
