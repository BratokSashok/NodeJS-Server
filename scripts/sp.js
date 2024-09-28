        //GET и POST запросы на чистом JavaScript
    // GET запрос с использованием Fetch API
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));

    // POST запрос с использованием Fetch API
// Пример POST запроса
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Ошибка:', error));


        // GET и POST запросы с использованием Axios

    // GET запрос с использованием Axios

// Подключение Axios через CDN
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
// Пример GET запроса
axios.get('https://jsonplaceholder.typicode.com/posts/1')
.then(response => console.log(response.data))
.catch(error => console.error('Ошибка:', error));

    // POST запрос с использованием Axios
    
// Пример POST запроса
axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
})
.then(response => console.log(response.data))
.catch(error => console.error('Ошибка:', error));
