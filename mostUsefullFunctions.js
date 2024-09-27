function setRandomBackgroundImage() {
    // Путь к папке с изображениями
    const folderPath = 'img/';
    
    // Максимальное количество изображений в папке
    const maxImages = 7; // Замените на фактическое количество изображений

    // Генерация случайного числа от 1 до maxImages
    const randomNumber = Math.floor(Math.random() * maxImages) + 1;
    const selectedImage = `Cat${randomNumber}.jpg`;

    const element = document.getElementById('homeID');
    if (element) {
        element.style.backgroundImage = `url(${folderPath}${selectedImage})`;
    }
}
// Вызов функции при загрузке страницы
window.onload = setRandomBackgroundImage;

