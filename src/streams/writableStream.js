
const fs = require("fs");

const input = require('../../streams/readableStream');

const output = fs.createWriteStream("destination.txt");



input.on("data", (chunk) => output.write(chunk));

input.on("error", (error) => console.log("Error", error.message));

