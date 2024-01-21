const fs = require('fs');

let files = './04-copy-directory/files';
let filesCopy = './04-copy-directory/files-copy';
function copyDir(files, filesCopy) {
  fs.cp(files, filesCopy, { recursive: true }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('File copying completed successfully!');
    }
  });
}

copyDir(files, filesCopy);
