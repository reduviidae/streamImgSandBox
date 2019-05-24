const sharp = require("sharp");
const fs = require("fs");

const createFrame = (width, height) => {
  const newFrame = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  }).png()

  return new Promise((resolve, reject) => {
    const outPath = `./artframe-${width}x${height}.png`;
    console.log("WRITING", outPath);
    const writeStream = fs.createWriteStream(outPath);

    newFrame.pipe(writeStream);
    newFrame.on("end", () => resolve(outPath));
    writeStream.on("error", reject);
  });
};


console.time("createFrame");
createFrame(4200, 4800);
console.timeEnd("createFrame");
//
// export default createFrame;
