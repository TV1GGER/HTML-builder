const fs = require('node:fs');
const { stdin, stdout } = process;
let text = '';

stdout.write('Привет, введите Ваш текст...\n');

stdin.on('data', function (data) {
  text = text + data.toString();
  if (data.toString().trim() !== 'exit') {
    fs.writeFile('./02-write-file/interText.txt', text, function (err) {
      if (err) console.log(err);
    });
  } else {
    console.log('До свидания, выполнение кода завершено!');
    process.exit();
  }
});

process.on('SIGINT', function () {
  console.log('До свидания, выполнение кода завершено!');
  process.exit();
});
