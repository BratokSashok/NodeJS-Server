const path = require('path');
//require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Указываем путь к .env на уровень выше
const crypto = require('crypto');
const fs = require('fs');

const adminAuth = (req, res, next) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return next();
  } else {
    return res.status(403).send('Доступ запрещен');
  }
};

const generateNewPassword = () => {
  const newPassword = crypto.randomBytes(16).toString('hex');
  process.env.ADMIN_PASSWORD = newPassword;

  // Чтение содержимого файла .env
  const envPath = path.resolve(__dirname, '../../.env');
  const envFileContent = fs.readFileSync(envPath, 'utf8');

  // Замена строки с паролем
  const updatedEnvFileContent = envFileContent.replace(/ADMIN_PASSWORD=.*/i, `ADMIN_PASSWORD=${newPassword}`);

  // Запись обратно в файл .env
  fs.writeFileSync(envPath, updatedEnvFileContent);
};

module.exports = { adminAuth, generateNewPassword };
