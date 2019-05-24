// following tutorial on:
// https://ollie.relph.me/streaming-image-resizer-with-node-js/

const http = require("http");
const https = require("https");

const fs = require("fs");

const sharp = require("sharp");

const imageUri =
  "https://images.unsplash.com/photo-1427805371062-cacdd21273f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=7bd7472930019681f251b16e76e05595";

const resizeAndSave = (downloadStream, size) => {
  const resizeTransform = sharp().resize(size[0], size[1]);

  return new Promise((resolve, reject) => {
    const outPath = `./output-${ size[0] }x${ size[1] }.jpg`;
    console.log('WRITING', outPath);
    const writeStream = fs.createWriteStream(outPath);

    downloadStream.pipe(resizeTransform).pipe(writeStream);
    downloadStream.on('end', () => resolve(outPath));
    writeStream.on('error', reject);
    resizeTransform.on('error', reject);
  })
}

const resizeImage = (imageUri, sizes) => {
  return new Promise((resolve, reject) => {
    let httpLib = http;
    if (/^https/.test(imageUri)) {
      httpLib = https;
    }

    httpLib.get(imageUri, downloadStream => {
      downloadStream.on('error', reject);

      Promise.all(
        sizes.map(size => resizeAndSave(downloadStream, size))
      )
      .then(resolve)
      .catch(reject);
    });
  });
};

resizeImage(imageUri, [
  [300, 300],
  [600, 450]
])
.then(thumbnailPath => console.log('DONE', thumbnailPath))
.catch(err => console.log(err));
