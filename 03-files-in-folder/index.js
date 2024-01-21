const path = require('path');
const fsPromises = require('fs').promises;

let filesSearch = async function (dir) {
  let filesArr = [];
  let docs = await fsPromises.readdir(dir);
  for (let key in docs) {
    let stats = await fsPromises.stat(
      './03-files-in-folder/secret-folder/' + docs[key],
    );
    let size = stats.size;
    let filesList =
      path.parse(docs[key], '.csv').name +
      ' ' +
      '-' +
      ' ' +
      path.extname(docs[key]) +
      ' ' +
      '-' +
      ' ' +
      size / 1024 +
      ' Kb';
    if (stats.isDirectory()) {
      /* empty */
    } else {
      filesArr.push(filesList);
    }
  }
  return filesArr;
};
filesSearch('./03-files-in-folder/secret-folder')
  .then(console.log)
  .catch(console.error);
