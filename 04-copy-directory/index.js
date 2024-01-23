const fs = require('fs');
const path = require('path');

let files = './04-copy-directory/files';

 async function createDir() {
  fs.mkdir(path.join('./04-copy-directory/', 'files-copy'),
  (err) => {
      if (err) {
          return console.error(err);
      }
  });
  console.log('Directory created successfully!');
 };

async function readDirectory() {
  fs.readdir(files,  
  { withFileTypes: true }, 
  (err, files) => { 
  console.log('Copied files to `files-copy` directory:'); 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => { 
      copyFileInDir(file.name.toString()); 
      console.log(file.name.toString());
    });
    console.log('File copying completed successfully!'); 
  } 
});
};

function copyFileInDir(n) {
  fs.copyFile(`./04-copy-directory/files/${n}`, `./04-copy-directory/files-copy/${n}`, function (err) {
    if (err) {
      console.log(err);
    } else {}
  });
}

createDir().then(readDirectory());
