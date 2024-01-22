const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
let text = '';

const dir = './05-merge-styles/styles/';
async function readDir(dir) {
  let docs = await fsPromises.readdir(dir, function () {});

  for (let key in docs) {
    if (path.extname(docs[key]).toString() === '.css') {
      let stream = fs.createReadStream(
        './05-merge-styles/styles/' + path.parse(docs[key]).name + '.css',
        { encoding: 'utf-8' },
      );

      stream.on('readable', function () {
        let data = stream.read();
        if (data != null) {
          text = text + data;
        }
        fs.writeFile(
          './05-merge-styles/project-dist/bundle.css',
          text,
          function (err) {
            if (err) {
              console.log(err);
            }
          },
        );
      });
    }
  }
}

readDir(dir);
