const http = require("http");
const https = require("https");
const sharp = require("sharp");

const createFrame = (width, height) => {
  const newFrame = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })

  return new Promise((resolve, reject) => {
    const outPath = `./artframe-${width}x${height}.png`;
    console.log('WRITING', outPath);
    newFrame.toFile(outPath);
    newFrame.on('end', () => resolve(outPath));
  })
}
console.time('createFrame')
createFrame(newFrame, 4200, 4800)
console.timeEnd('createFrame')
