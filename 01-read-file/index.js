const fs = require('node:fs');
const rr = fs.createReadStream('./01-read-file/text.txt', {
  encoding: 'utf-8',
});

rr.on('readable', () => {
  let readData = rr.read();
  if (readData !== null) {
    console.log(readData);
  }
});
