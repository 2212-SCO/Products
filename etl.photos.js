const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;
const csvStringifier = createCsvStringifier(
  {
    header: [
      { id: 'id', title: 'id' },
      { id: 'styleId', title: 'style_id' },
      { id: 'url', title: 'url' },
      { id: 'thumbnail_url', title: 'thumbnail_url' },
    ],
  });

let readStream = fs.createReadStream('./csv/testing.csv');
let writeStream = fs.createWriteStream('./csv/testingcleanphotos.csv');

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

    if (chunk.thumbnail_url[chunk.thumbnail_url.length] !== '"') {
      console.log("chunk",chunk.id, typeof chunk.thumbnail_url)
      chunk.thumbnail_url +='"';
    }

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
  .on('finish', () => { console.log('finished'); });