/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => response.json())
        .then(cities => {
            const sortCities = cities.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (b.name > a.name) {
                    return -1;
                }

                return 0;
            });

            return sortCities;
        });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */

function listen(eventTarget, serverResponseArr, finalTarget) {
    eventTarget.addEventListener('keyup', function() {
        finalTarget.innerHTML = '';
        let userType = eventTarget.value;

        for (let i = 0; i < serverResponseArr.length; i++) {
            if (isMatching(serverResponseArr[i].name, userType)) {
                const li = document.createElement('li');

                li.innerText = serverResponseArr[i].name;
                finalTarget.appendChild(li);
            }
        }
        if (userType === '') {
            finalTarget.innerHTML = '';
        }
    });
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    }

    return false;
}

function succes(serverResponseArr) {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';

    return serverResponseArr;
}
function errorDOM(error) {
    const reload = confirm(`Loading error: ${error.message}. Try again?`);

    if (reload) {
        loadTowns();
    }
}

function showTowns() {
    loadTowns()
        .then(cities => succes(cities))
        .then(cities => listen(filterInput, cities, filterResult))
        .catch(error => errorDOM(error));
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

showTowns();

export { loadTowns, isMatching };
