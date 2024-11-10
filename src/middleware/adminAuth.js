const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Указываем путь к .env на уровень выше
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
  fs.writeFileSync(path.resolve(__dirname, '../../.env'), `ADMIN_USERNAME=${process.env.ADMIN_USERNAME}\nADMIN_PASSWORD=${newPassword}`); // Указываем путь к .env на уровень выше
};

module.exports = { adminAuth, generateNewPassword };
