import { joinImages } from 'join-images';
import minimist from 'minimist';
import fetch from 'node-fetch'; // TODO: can be removed when Fetch Api is stable in node 18

const argv = minimist(process.argv.slice(2));
const { greeting = 'Hello', who = 'You', width = 400, height = 500, color = 'Pink', size = 100 } = argv;

async function fetchImage(keyword) {
  const response = await fetch(
    `https://cataas.com/cat/says/${keyword}?width=${width}&height=${height}&color=${color}&s=${size}`
  );

  console.log('Received response with status: ', response.status);
  return Buffer.from(await response.arrayBuffer(), 'binary');
}

const [image1, image2] = await Promise.all([fetchImage(greeting), fetchImage(who)]);
const result = await joinImages([image1, image2], { direction: 'horizontal' });
result.toFile('cat-card.jpg', () => console.log('The file was saved!'));
