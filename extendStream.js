const sharp = require("sharp");
const fs = require("fs");

const extendFrame = (frame, top, bottom, left, right, name) => {
  const extendedFrame = sharp(frame).extend({
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    background: { r: 0, g: 0, b: 0, alpha: 1 }
  });

  return new Promise((resolve, reject) =>{
    const outPath = `./extended-art-frame-${name}.png`;
    console.log("WRITING", outPath);
    const writeStream = fs.createWriteStream(outPath);

    extendedFrame.pipe(writeStream);
    extendedFrame.on("end", () => resolve(outPath));
    writeStream.on("error", reject)
  })
};

console.time("extendFrame")
extendFrame("./artframe-4200x4800.png", 0, 900, 250, 250, "4500x5700")
console.timeEnd("extendFrame");
