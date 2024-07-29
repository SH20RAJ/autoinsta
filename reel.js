const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs/promises');

const ig = new IgApiClient();

const password = ";ya_#GkM,KND6?$";
const email = "uvfczvl@smartnator.com";
const username = "droidcv1";

async function login() {
  ig.state.generateDevice(username);
  try {
    await ig.account.login(username, password);
  } catch (error) {
    if (error.name === 'IgCheckpointError') {
      await ig.challenge.auto(true); // Requesting to auto solve the challenge
      console.log(ig.state.checkpoint); // Checkpoint info here

      // User needs to manually complete the challenge (e.g., via email/SMS)
      await ig.challenge.selectVerifyMethod(1); // 0 for phone, 1 for email
      const { code } = await promptCode(); // Prompt the user to enter the code manually
      await ig.challenge.sendSecurityCode(code);
    } else {
      throw error;
    }
  }
}

async function uploadReel(videoPath, coverImagePath, caption) {
  const videoBuffer = await readFile(videoPath);
  const coverImageBuffer = await readFile(coverImagePath);

  await ig.publish.video({
    video: videoBuffer,
    coverImage: coverImageBuffer,
    caption: caption,
  });
}

// Simple function to prompt the user for the security code
async function promptCode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question('Enter the code you received: ', (code) => {
      rl.close();
      resolve({ code });
    });
  });
}

(async () => {
  await login();
  await uploadReel('path_to_your_video.mp4', 'path_to_your_cover_image.jpg', 'Your caption here');
})();
