const http = require("http");
const https = require("https");
const fs = require("fs");
const sharp = require("sharp");

const newFrame = sharp({
  create: {
    width: 4200,
    height: 4800,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  }
})

const createFrame = (createStream, width, height) => {

  return new Promise((resolve, reject) => {
    const outPath = `./artframe-${width}x${height}.png`;
    console.log('WRITING', outPath);
    createStream.toFile(outPath);
    createStream.on('end', () => resolve(outPath));
  })
}

createFrame(newFrame, 4200, 4800)
