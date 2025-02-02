//zadanie 1:

// const fs = require("fs");

// const readStream = fs.createReadStream("myfile.txt", "utf-8");

// readStream.on("data", (chunk) => {
//     console.log(chunk); 
// });

// readStream.on("end", () => {
//     console.log("Чтение файла завершено.");
// });

// readStream.on("error", (error) => {
//     console.error("Ошибка при чтении файла:", error.message);
// });

// zadanie 2:

const fs = require("fs");

const readStream = fs.createReadStream("myfile.txt", "utf-8");
const writeStream = fs.createWriteStream("destination.txt");

readStream.on("data", (chunk) => {
    writeStream.write(chunk); // Записываем каждый кусок данных
});

readStream.on("end", () => {
    writeStream.end(); // Завершаем запись
    console.log("Данные успешно записаны в destination.txt");
});

readStream.on("error", (error) => {
    console.error("Ошибка при чтении файла:", error.message);
});

writeStream.on("error", (error) => {
    console.error("Ошибка при записи файла:", error.message);
});