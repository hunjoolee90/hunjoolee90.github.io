const images = ["blackdesk.jpg"];

const chosenImage = images(Math.floor(Math.random() * images.length));

document.body.style.backgroundImage = `url('img/${chosenImage}')`;
