// following tutorial on:
// https://ollie.relph.me/streaming-image-resizer-with-node-js/

const http = require("http");
const https = require("https");

const fs = require("fs");

const sharp = require("sharp");

const resizeTransform = sharp().resize(300, 300);

const imageUri =
  "https://images.unsplash.com/photo-1427805371062-cacdd21273f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=7bd7472930019681f251b16e76e05595";

// determine whether http or https is appropriate
let httpLib = http;
if (/^https/.test(imageUri)) {
  httpLib = https;
}

// read image
httpLib.get(imageUri, downloadStream => {
  const writeStream = fs.createWriteStream("./output.jpg");

  downloadStream.pipe(resizeTransform).pipe(writeStream);

  downloadStream.on("end", () => {
    console.log("downloadStream", "END");
  });

  writeStream.on("error", err => {
    console.log("writeStream", err);
  });

  downloadStream.on("error", err => {
    console.log("downloadStream", err);
  });

  resizeTransform.on("error", err => {
    console.log("resizeTransform", err);
  });
});
