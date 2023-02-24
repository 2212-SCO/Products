const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "styleId", title: "style_id" },
    { id: "url", title: "url" },
    { id: "thumbnail_url", title: "thumbnail_url" },
  ],
});

let readStream = fs.createReadStream("./csv/photos.csv");
let writeStream = fs.createWriteStream("./csv/testing.csv");

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    //   for (let key in chunk) {
    //     //trims whitespace
    //     let trimKey = key.trim();
    //     chunk[trimKey] = chunk[key];
    //     if (key !== trimKey) { delete chunk[key]; }
    //   }
    let stringifiedChunk = JSON.stringify(chunk);
    let splitChunk = stringifiedChunk.split("");
    splitChunk.forEach((character, index) => {
      if (character === "\\") {
        splitChunk.splice(index, 2);
      }
    });
    let rejoinedChunk = JSON.parse(splitChunk.join(""));

    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);

    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });
//write header
writeStream.write(csvStringifier.getHeaderString());
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
