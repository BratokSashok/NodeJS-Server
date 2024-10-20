let useCatFolder = true;

        function setRandomBackgroundImage() {
            // Путь к папке с изображениями и максимальное количество изображений
            const folderPath = useCatFolder ? '../cats/' : '../memes/';
            const maxImages = useCatFolder ? 29 : 26; // Замените на фактическое количество изображений в папках

            // Генерация случайного числа от 1 до maxImages
            const randomNumber = Math.floor(Math.random() * maxImages) + 1;
            const selectedImage = useCatFolder ? `Cat${randomNumber}.jpg` : `Meme${randomNumber}.jpg`;

            const element = document.getElementById('homeID');
            if (element) {
                element.style.backgroundImage = `url(${folderPath}${selectedImage})`;
            }
        }

        function toggleFolder() {
            useCatFolder = !useCatFolder;
            localStorage.setItem('useCatFolder', useCatFolder);
            const button = document.getElementById('toggleButton');
            button.textContent = useCatFolder ? 'Switch to Memes' : 'Switch to Cats';
            setRandomBackgroundImage();
        }

        // Вызов функции при загрузке страницы
        window.onload = () => {
            const savedFolderPreference = localStorage.getItem('useCatFolder');
            if (savedFolderPreference !== null) {
                useCatFolder = savedFolderPreference === 'true';
            }
            const button = document.getElementById('toggleButton');
            button.textContent = useCatFolder ? 'Switch to Memes' : 'Switch to Cats';
            setRandomBackgroundImage();
        };
        