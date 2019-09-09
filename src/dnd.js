/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('div');
    let divHeight = getRandomInt(50, 300);
    let divWidth = getRandomInt(50, 300);

    div.style.width = divWidth + 'px';
    div.style.height = divHeight + 'px';
    div.style.display = 'inline-block';
    div.style.position = 'absolute';
    div.style.backgroundColor = `rgb(
        ${getRandomInt(0, 256)},
        ${getRandomInt(0, 256)},
        ${getRandomInt(0, 256)})`;
    div.classList.add('draggable-div');
    div.style.top = getRandomInt(0, 300) + 'px';
    div.style.left = getRandomInt(0, 300) + 'px';

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let cursorY;
    let cursorX;

    target.addEventListener('dragstart', function (e) {
        cursorY = e.offsetY;
        cursorX = e.offsetX;
    });

    target.addEventListener('dragend', function (e) {
        target.style.top = e.pageY - cursorY + 'px';
        target.style.left = e.pageX - cursorX + 'px';
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };

// const homeworkContainer = document.querySelector("#homework-container");
// homeworkContainer.style.minHeight = "100vh";
// homeworkContainer.style.position = "relative";
// const btn = document.querySelector("#btn");
// btn.style.cssText = "position: fixed; width: 100px; height: 100px;left: 20px; top: 20px; z-index: 1000";

// btn.addEventListener("click", function (e) {
//     let div = document.createElement("div");
//     div.innerText = "Drag me" + "\n" + "mazafaka";
//     let divHeight = getRandomInt(50, 300);
//     let divWidth = getRandomInt(50, 300);
//     div.style.width = divWidth + "px";
//     div.style.height = divHeight + "px";
//     div.style.display = "inline-block";
//     div.style.position = "absolute";
//     div.style.backgroundColor = `rgb(
//         ${getRandomInt(0, 256)},
//         ${getRandomInt(0, 256)},
//         ${getRandomInt(0, 256)})`;
//     let coords = homeworkContainer.getBoundingClientRect();

//     div.style.top = getRandomInt(0, coords.height - divHeight) + "px";
//     div.style.left = getRandomInt(0, coords.width - divWidth) + "px";

//     div.setAttribute("draggable", "true");
//     let cursorY;
//     let cursorX;
//     div.addEventListener("dragstart", function (e) {
//         cursorY = e.offsetY;
//         cursorX = e.offsetX;
//     });

//     div.addEventListener("dragend", function (e) {
//         div.style.top = e.pageY - cursorY + "px";
//         div.style.left = e.pageX - cursorX + "px";
//     });

//     homeworkContainer.appendChild(div);

//     function getRandomInt(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }
// });