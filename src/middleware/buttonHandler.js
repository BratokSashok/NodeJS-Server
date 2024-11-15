const path = require('path');

let useCatFolder = true;

function setRandomBackgroundImage() {
    const folderPath = useCatFolder ? 'src/public/cats/' : 'src/public/memes/';
    const maxImages = useCatFolder ? 29 : 26;
    const randomNumber = Math.floor(Math.random() * maxImages) + 1;
    const selectedImage = useCatFolder ? `Cat${randomNumber}.jpg` : `Meme${randomNumber}.jpg`;
    return path.join(folderPath, selectedImage);
}

function toggleFolder() {
    useCatFolder = !useCatFolder;
    const backgroundImage = setRandomBackgroundImage();
    return { useCatFolder, backgroundImage };
}

function setupButtonRoutes(app) {
    app.get('/toggle-folder', (req, res) => {
        const result = toggleFolder();
        res.json(result);
    });

    app.get('/random-background', (req, res) => {
        const backgroundImage = setRandomBackgroundImage();
        res.sendFile(path.join(__dirname, '../../', backgroundImage));
    });
}

module.exports = { setupButtonRoutes };
