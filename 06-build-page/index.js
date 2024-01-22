const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
// const { stdin, stdout } = process;

let text = '';
let htmlTextFinal = '';
// let htmlTextFinal2 = '';

let files = './06-build-page/assets';
let filesToCopy = './06-build-page/project-dist/assets';

async function prepareHtml() {
  let htmlText = fs.createReadStream('./06-build-page/template.html', {
    encoding: 'utf-8',
  });
  await new Promise(() => {
    htmlText.on('readable', function () {
      let data = htmlText.read();
      if (data != null) {
        htmlTextFinal = htmlTextFinal + data;
      }
    });
    htmlText.on('end', function () {});
  });
}

function writeFiles() {
  fsPromises.mkdir('./06-build-page/project-dist/').then(
    fs.writeFile(
      './06-build-page/project-dist/index.html',
      htmlTextFinal,
      (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully!!');
        }
      },
    ),
  );
}

async function copyDir(files, filesToCopy) {
  let fcCopy = await fsPromises.cp(
    files,
    filesToCopy,
    { recursive: true },
    function () {
      console.log('success copy files!');
    },
  );
  return fcCopy;
}

const dir = './06-build-page/styles/';
async function readDir(dir) {
  writeFiles();
  let docs = await fsPromises.readdir(dir);

  for (let key in docs) {
    if (path.extname(docs[key]).toString() === '.css') {
      let stream = fs.createReadStream(
        './06-build-page/styles/' + path.parse(docs[key]).name + '.css',
        { encoding: 'utf-8' },
      );

      stream.on('readable', function () {
        let data = stream.read();
        if (data != null) {
          text = text + data;
        }
        fs.writeFile(
          './06-build-page/project-dist/style.css',
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

prepareHtml()
  .then(copyDir(files, filesToCopy))
  .then(readDir(dir))
  .catch(console.error);
