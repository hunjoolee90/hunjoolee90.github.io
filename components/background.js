const images = ["blackdesk.jpg", "pinkdesk.jpg", "mintdesk.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

document.body.style.backgroundImage = `url('/image/${chosenImage}')`;
