const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const deleteContents = (folderPath) => {
  fs.readdirSync(folderPath).forEach((file) => {
    const curPath = path.join(folderPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteContents(curPath);
      fs.rmdirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
};

const projectRoot = path.resolve(__dirname);

rl.question('Проебали? (да/нет): ', (answer) => {
  if (answer.toLowerCase() === 'да') {
    deleteContents(projectRoot);
    console.log('НУ ЛАДНО, ЕСЛИ ТЕРЯТЬ ТАК СРАЗУ ВСЁ!1!1!!!11!!');
  } else {
    console.log('Ссыкло.');
  }
  rl.close();
});
